import { Link, Image, useState, React, HeadSection, axios, apikey } from "@/pages/imports"
import { Trash2, ArrowLeft } from "lucide-react"


const FindByIngredients = () => {
    const [Ingredients, SetIngredients] = useState<Array<string>>([])
    const [DispRecipe, SetDspRecipe] = useState<Array<any>>()
    const [FormData, SetFormData] = useState("")
    const HandleIngredients = (event: React.FormEvent) => {
        event.preventDefault()
        SetFormData("")
        Ingredients.push(FormData)
        GetRecipeByIngredients()
    }

    const RemoveIngredient = (index: number) => {
        var newIngredients = [...Ingredients]
        newIngredients.splice(index, 1)
        SetIngredients(newIngredients)
        GetRecipeByIngredients()
    }


    const GetRecipeByIngredients = async () => {
        const config = {
            method: "get",
            maxBodyLength: Infinity,
            headers: {
                "x-api-key": apikey,
            },
        };
        const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${Ingredients.map((ingredient: any) => (ingredient + ","))}`, config)
        SetDspRecipe(response.data)
    }

    return (
        <>
            <HeadSection />
            <main className="min-h-screen w-[95vw]">
                <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span className="sr-only">Open sidebar</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                </button>


                <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-96 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                        <div>
                            <Link href={"/"} className="flex gap-1 hover:text-blue-400"> <ArrowLeft className=" text-2xl" /> Dashboard</Link>
                        </div>
                        <form className=' mt-[15vh] space-y-3 font-medium' onSubmit={HandleIngredients}>
                            <h1 className="text-xl font-semibold">Add/Remove Ingredients</h1>
                            <div className="mb-6 mx-3">
                                <input type="search" autoComplete="off" autoCorrect="off" value={FormData} onChange={(e) => SetFormData(e.target.value)} id="Ingredients" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                        </form>
                        <div id="alert-1" className="flex items-center p-4 mb-4 mt-[3vh] text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                            <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div className="ml-3 text-sm font-medium">
                                The only ingredients we assume {"you've"} are salt & pepper
                            </div>
                            </div>


                        <div className="flex items-center justify-evenly flex-wrap gap-4">
                            {/* Displaying the ingredients */}
                            {Ingredients && Ingredients.map((ingredient: any, index: number) => (
                                <div key={index} className="flex items-center justify-between px-3 py-2 rounded-2xl bg-slate-200 dark:bg-slate-900 w-[10vw]">
                                    <h3 className="ml-1.5">{ingredient}</h3>
                                    <button onClick={() => RemoveIngredient(index)} className="dark:bg-slate-900 bg-slate-300 p-2 rounded-full mr-1.5">
                                        <Trash2 className="dark:hover:text-red-400 hover:text-red-600" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                <div className="p-4 sm:ml-[25vw]">
                    <div className="p-4  border-gray-200  rounded-lg ">
                        <div className="grid 2xl:xl:lg:md:grid-cols-2 gap-4 ">
                            {DispRecipe && DispRecipe.map((recipe: any, index: number) => (
                                <Link key={index} href={`/RecipeInfo?RecipeId=${recipe.id}`} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                    <Image width={150} height={150} className="object-cover w-full rounded-t-lg h-40 md:h-40 md:w-48 md:rounded-none md:rounded-l-lg" src={recipe.image} alt="" />
                                    <div className="flex flex-col justify-between p-4 leading-normal">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{recipe.title}</h5>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

            </main>
        </>
    )
}

export default FindByIngredients


