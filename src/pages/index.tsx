
import { axios, HeadSection, Link, Image, apikey, Navbar, useState, useRouter } from "@/pages/imports"

import { Suspense } from "react";

const Home: React.FC = ({ RecipeData }: any) => {
  const apikey = "640063263d984a2ca21f0802f750c364";

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
    <>
      <Navbar />
      <HeadSection />
      <main className=" dark:bg-[#000000]  min-h-screen bg-slate-200 xl:px-5 px-0">
        <h1 className="my-5 text-3xl ml-2">Welcome to the Smart Chef</h1>
        <div className="grid  xl:grid-cols-3 lg:grid-cols-2  grid-cols-1   xl:gap-5 gap-10  ">

          <section className=" flex items-center flex-wrap justify-evenly  gap-3 lg:mx-0 mx-auto  col-span-1  w-full ">
            <Suspense fallback="Loading the Data">
              {RecipeData && RecipeData.map((recipe: any, index: number) => (
                <Link key={index} href={`/RecipeInfo?RecipeId=${recipe.id}`} className=" md:mx-0 mx-auto sm:place-items-start place-items-center  grid sm:grid-cols-3 lg:w-full sm:w-[512px] gap-3 w-64 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-slate-900 dark:bg-slate-900 dark:hover:bg-slate-800">
                  <Image className=" sm:w-64 w-full  object-cover  sm:h-full h-52 md:rounded-none  rounded-t-lg  " src={recipe.image} width={150} height={1} alt="" />
                  <div className=" flex flex-col sm:text-left text-center  sm:col-span-2 col-span-1 gap-1 items-center  w-full md:rounded-none rounded-b-lg ">
                    <h5 className="mb-2 mt-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{recipe.title}</h5>
                    <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                  </div>
                </Link>
              ))}
            </Suspense>

          </section>

          <section className=" xl:col-span-2 col-span-1  ">
            <div className="p-5 max-w-xl dark:bg-slate-900 bg-slate-300 rounded-lg mt-5 mx-auto">
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
            <div className="flex items-center flex-wrap justify-evenly  gap-5 mt-[3vh] md:mx-0 mx-auto md:w-auto md:place-items-start place-items-center  ">
              {Recipe && Recipe.map((recipe: any, index: number) => (
                <Link key={index} href={`/RecipeInfo?RecipeId=${recipe.id}`} className=" lg:mx-0 mx-auto sm:place-items-start place-items-center  grid sm:grid-cols-3 lg:w-full sm:w-[512px] gap-3 w-64 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-slate-900 dark:bg-slate-900 dark:hover:bg-slate-800">
                  <Image className=" sm:w-64 w-full  object-cover  sm:h-full h-52 md:rounded-none  rounded-t-lg  " src={recipe.image} width={150} height={1} alt="" />
                  <div className=" flex flex-col sm:text-left text-center  sm:col-span-2 col-span-1 gap-1 items-center  w-full md:rounded-none rounded-b-lg ">
                    <h5 className="mb-2 mt-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{recipe.title}</h5>
                    <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                  </div>
                </Link>
              ))}
            </div>

          </section>
        </div>
      </main>
    </>
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
  const result = await axios.get("https://api.spoonacular.com/recipes/random?number=6", config)
  return {
    props: {
      RecipeData: result.data.recipes,
    }
  }
}