import {
  React,
  useState,
  axios,
  Image,
  useRouter,
  apikey,
  HeadSection,
  Navbar,
} from "@/pages/imports";

export default function Home() {
  const [RecipeName, SetRecipeName] = useState<any>("");
  const [ViewData, SetViewData] = useState<any>(null);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    SetRecipeName("");
    GetRecipe();
  };

  const router = useRouter();

  const GetRecipe = async () => {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${RecipeName}&apiKey=${apikey}`
    );
    console.log(response);
    SetViewData(response.data.results);
  };

  const Redirect = (id: BigInteger) => {
    router.push(`/DisplayRecipeInfo?id=${id}`);
    console.log(id);
  };
  return (
    <main className=" bg-slate-700  min-h-screen p-1 ">
      <HeadSection />
      <Navbar />
      <section className="  mx-auto max-w-2xl mt-24 rounded-md ">
        <div className=" p-10 dark:bg-slate-900 flex items-center mb-3 justify-center  mx-auto  rounded-lg">
          <div>
            <h1 className="text-2xl font-thin mb-3 mx-auto">
              {" "}
              Welcome to the Recipe app
            </h1>
            <form
              onSubmit={handleSubmit}
              className="space-y-3   sm:space-y-0 sm:flex sm:items-center sm:space-x-2 dark:text-gray-100"
            >
              <div className=" ">
                <input
                  className="w-full block border placeholder-gray-500 px-6 py-2 outline-none leading-6 rounded-lg border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-600 dark:focus:border-blue-500 dark:placeholder-gray-400"
                  type="search"
                  id="recipe"
                  autoComplete="off"
                  autoCorrect="off"
                  name="recipe"
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
        </div>
        {/* Displaying the results */}
      </section>
      <section className="flex w-10/12  items-center flex-wrap gap-5 mx-auto justify-around">
        {ViewData &&
          ViewData.map((item: any, index: any) => (
            <div key={index}>
              <div className="flex flex-col rounded-lg shadow-sm bg-white overflow-hidden dark:text-gray-100 dark:bg-gray-800 mb-2">
                <div className="p-5 grow">
                  <div className="flex space-x-4">
                    <Image
                      width={120}
                      height={120}
                      className="flex-none inline-block rounded-md mt-1"
                      src={item.image}
                      alt=""
                    />
                    <div className="grow text-sm">
                      <p className="font-semibold text-lg text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300">
                        {item.title}
                      </p>
                      <p className="space-x-2">
                        <button
                          onClick={() => Redirect(item.id)}
                          className="font-medium text-gray-500 hover:text-gray-400"
                        >
                          See the Recipe Details
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </section>
    </main>
  );
}
