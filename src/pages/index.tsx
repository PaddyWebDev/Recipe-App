import {
  React,
  useState,
  axios,
  Image,
  useRouter,
  apikey,
  HeadSection,
  Navbar,
  Link,
} from "@/pages/imports";
import { Suspense } from "react";

const Home: React.FC = ({ RecipeData }: any) => {
  const router = useRouter();
  const [RecipeName, SetRecipeName] = useState<string>("");
  const [Recipe, SetRecipe] = useState<any>(null);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    SetRecipeName("");
    Hlayout()
  };

  const Hlayout = async () => {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${RecipeName}&apiKey=${apikey}&number=4`)
    response.data.totalResults === 0 ? alert("Invalid Keyword Blyaad") : ""
    SetRecipe(response.data.results)
  }



  return (
    <main className=" dark:bg-[#000000]  min-h-screen bg-slate-200 ">
      <HeadSection />
      <Navbar />
      <h1 className="my-5 text-3xl ml-2">Welcome to the Smart Chef</h1>
      <div className="grid mx-5 2xl:xl:grid-cols-3 lg:md:grid-cols-2 sm:grid-cols-1  place-items-center  gap-8  ">
        <section className=" flex gap-3 flex-col col-span-1  2xl:xl:lg:md:sm:w-[512px]   ">
          <Suspense fallback="Loading the Data">
            {RecipeData && RecipeData.map((recipe: any, index: number) => (
              <Link key={index} href={`/RecipeInfo?RecipeId=${recipe.id}`} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-2xl hover:bg-gray-100 dark:border-slate-900 dark:bg-slate-900 dark:hover:bg-slate-800">
                <Suspense fallback="Loading the Image">
                  <Image className="2xl:xl:lg:md:sm:object-cover object-contain h-44 md:h-auto md:w-48 md:rounded-none w-full rounded-t-lg  " src={recipe.image} width={150} height={1} alt="" />
                </Suspense>
                <div className="flex flex-col justify-between p-2 leading-normal">
                  <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">{recipe.title}</h5>
                </div>
              </Link>
            ))}
          </Suspense>

        </section>

        <section className="2xl:xl:col-span-2 lg:md:sm:col-span-1 rounded-md  ">
          <div className="max-w-lg   p-5 dark:bg-slate-900 bg-slate-300 rounded-lg mt-5 mx-auto">
            <h1 className="text-3xl text-center font-light mb-3" >Search for your desired recipe</h1>
            <form
              onSubmit={handleSubmit}
              className="space-y-3 w-fit mx-auto sm:space-y-0 sm:flex sm:items-center sm:space-x-2 dark:text-gray-100"
            >
              <div className=" ">
                <input
                  className="w-full block border placeholder-gray-500 px-6 py-2 outline-none leading-6 rounded-lg border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-600 dark:focus:border-blue-500 dark:placeholder-gray-400"
                  type="search"
                  id="recipe"
                  autoComplete="off"
                  autoCorrect="off"
                  required
                  value={RecipeName}
                  onChange={(e) => SetRecipeName(e.target.value)}
                  placeholder="Search for Recipe ..."
                />
              </div>
              <button
                type="submit"
                className="inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-4 py-2 leading-6 border-blue-700 bg-blue-700 text-white hover:text-white hover:bg-blue-600 hover:border-blue-600 focus:ring focus:ring-blue-400 focus:ring-opacity-50 active:bg-blue-700 active:border-blue-700 dark:focus:ring-blue-400 dark:focus:ring-opacity-90"
              >
                Search
              </button>

            </form>
          </div>

          {/* results */}
          <div className="grid 2xl:xl:lg:md:grid-cols-2 gap-5 mt-5 grid-cols-2 sm:grid-cols-1">
            {Recipe && Recipe.map((recipe: any, index: number) => (
              <Link key={index} href={`/RecipeInfo?RecipeId=${recipe.id}`} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-2xl hover:bg-gray-100 dark:border-slate-900 dark:bg-slate-900 dark:hover:bg-slate-800">
                <Image className="2xl:xl:lg:md:sm:object-cover object-contain h-44 md:h-auto md:w-48 md:rounded-none w-full rounded-t-lg  " src={recipe.image} width={150} height={1} alt="" />
                <div className="flex flex-col justify-between p-2 leading-normal">
                  <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">{recipe.title}</h5>
                </div>
              </Link>
            ))}
          </div>

        </section>
      </div>
    </main>
  );
}
export default Home

export const getServerSideProps = async () => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    headers: {
      "x-api-key": apikey,
    },
  };
  const result = await axios.get("https://api.spoonacular.com/recipes/random?number=5", config)
  return {
    props: {
      RecipeData: result.data.recipes,
    }
  }
}