
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeadSection from "./components/HeadSection";
import Navbar from "./components/Navbar";
export default function RecipeInfo({ RecipeData }: any) {

  return (
    <>
      <HeadSection />
      <Navbar />
    <main className=" min-h-screen select-none dark:bg-[#000000] bg-[#fafafad0] sm:p-0 p-5 ">
      {/* Main Card */}
      {RecipeData && (
        <div className="flex items-center justify-around mt-12  ">
          <section className="dark:bg-slate-900 bg-[#f3efebe0] max-w-4xl p-7 rounded-xl">
            <h1 className="text-5xl sm:text-3xl md:text-4xl mx-auto mb-5 ">
              {RecipeData.title}
            </h1>
            <div className="flex items-center justify-evenly gap-3 flex-wrap mb-4">
              <Image
                width={320}
                height={320}
                draggable="false"
                className="rounded-md  sm:w-auto md:w-[20rem] lg:w-[25rem] sm:mx-auto lg:m-0 md:m-0"
                src={RecipeData.image}
                alt=""
              />

              <div className=" max-w-4xl p-3 ">
                <h2 className="text-2xl mb-3 ">Tags : </h2>
                <div className="flex gap-3  items-center justify-evenly mb-3 flex-wrap">
                  {
                    RecipeData.vegan || RecipeData.veryHealthy || RecipeData.vegetarian || RecipeData.glutenFree && (
                      <h3 className="dark:bg-slate-950 bg-zinc-300 py-2 px-3 rounded-lg">
                        {RecipeData.vegan ? (
                          "Vegan"
                        ) : RecipeData.veryHealthy ? (
                          " Healthy"
                        ) : RecipeData.vegetarian ? (
                          "Vegetarian"
                        ) :
                          RecipeData.glutenFree ? (
                            "Gluten Free "
                          ) : ""}
                      </h3>
                    )
                  }


                  {RecipeData.diets.map((dietType: any, index: any) => (
                    <div key={index}>
                      <h3 className="  dark:bg-slate-950 bg-zinc-300  p-2 rounded-lg   ">
                        {dietType}
                      </h3>
                    </div>
                  ))}

                  <div className="flex gap-3 items-center justify-around flex-wrap">
                    {RecipeData.cuisines.map((item: any, index: any) => (
                      <li
                        className="list-none dark:bg-slate-950 bg-zinc-300  p-2  rounded-lg "
                        key={index}
                      >
                        {item}
                      </li>
                    ))}
                  </div>
                </div>
                <h3 className="text-xl">
                  Yeild : {RecipeData.servings} servings{" "}
                </h3>
              </div>
            </div>

            <div className="mb-3">
              <h3 className="text-xl font-medium mb-2">Can be Eaten as : </h3>
              <div className="flex items-center justify-evenly flex-wrap gap-5 mb-2        ">
                {RecipeData.dishTypes.map((dishTypes: any, index: any) => (
                  <li
                    key={index}
                    className=" list-none dark:bg-slate-950 bg-zinc-300  px-3 py-2 rounded-lg "
                  >
                    {dishTypes}
                  </li>
                ))}
              </div>
            </div>

            {/* Ingredients Section */}
            <section className="  mb-3">
              <h4 className="text-2xl">Ingredients : </h4>
              <div className=" grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-1 p-5  ">
                {RecipeData.extendedIngredients.map((item: any, index: any) => (
                  <div key={index} className="">
                    <h4>
                      {index + 1}. {item.nameClean}
                    </h4>
                  </div>
                ))}
              </div>
            </section>

            {/* Preparation Instructions  */}
            <section className="  pl-3 max-w-5xl ">
              {RecipeData.analyzedInstructions[0]?.steps && (
                <>
                  <h4 className="text-2xl">Instructions: </h4>
                  <div className="">
                    {RecipeData.analyzedInstructions[0]?.steps.map(
                      (item: any, index: any) => (
                        <React.Fragment key={index}>
                          <p className="text-left mx-auto my-3 text-lg">
                            <span className=" font-semibold ">Step : </span>
                            {index + 1} {""}
                            {item.step}
                          </p>
                        </React.Fragment>
                      )
                    )}
                  </div>
                </>
              )}

              <div className="mb-3">
                <h3 className="text-2xl">
                  Source :{" "}
                  <Link href={RecipeData.sourceUrl}> {RecipeData.sourceName}</Link>
                </h3>
              </div>
            </section>
          </section>
        </div >
      )
      }
    </main >
    </>
  );
}



export async function getServerSideProps({ query }: any) {
  const { RecipeId } = query;
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
    },
  };
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/${RecipeId}/information`,
    config
  );

  return {
    props: {
      RecipeData: response.data,
    },
  };
}
