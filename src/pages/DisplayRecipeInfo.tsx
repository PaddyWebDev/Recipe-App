import {
  React,
  axios,
  useState,
  useEffect,
  apikey,
  Image,
  Link,
  HeadSection,
} from "@/pages/imports";

function DisplayRecipeInfo({ data }: any) {
  const [ViewInfo, SetInfo] = useState<any>(null);
  const GetRecipeInfo = async () => {
    console.log(data);
    SetInfo(data);
  };
  useEffect(() => {
    GetRecipeInfo();
  });
  return (
    <main className="bg-slate-800 min-h-screen p-5 select-none">
      <HeadSection />
      {/* Main Card */}
      {ViewInfo && (
        <div className="flex items-center justify-around mt-12 bg-slate-800 ">
          <section className="bg-slate-900 max-w-6xl p-7 rounded-xl">
            <h1 className="text-5xl sm:text-3xl md:text-4xl mx-auto mb-5 ">
              {ViewInfo.title}
            </h1>
            <div className="flex items-center justify-evenly gap-3 flex-wrap mb-4">
              <Image
                width={320}
                height={320}
                draggable="false"
                className="rounded-md  sm:w-auto md:w-[20rem] lg:w-[25rem] sm:mx-auto lg:m-0 md:m-0"
                src={ViewInfo.image}
                alt=""
              />

              <div className=" max-w-4xl p-3 ">
                <h2 className="text-2xl mb-3 ">Tags : </h2>
                <div className="flex gap-3  items-center justify-evenly mb-3 flex-wrap">
                  {ViewInfo.vegan ? (
                    <h3 className="bg-slate-950 py-2 px-3 rounded-lg">
                      {" "}
                      Vegan
                    </h3>
                  ) : (
                    ""
                  )}

                  {ViewInfo.veryHealthy ? (
                    <h3 className="bg-slate-950 py-2 px-3 rounded-lg">
                      {" "}
                      Healthy
                    </h3>
                  ) : (
                    ""
                  )}

                  {ViewInfo.vegetarian ? (
                    <h3 className="bg-slate-950 py-2 px-3 rounded-lg">
                      {" "}
                      Vegetarian
                    </h3>
                  ) : (
                    ""
                  )}

                  {ViewInfo.glutenFree ? (
                    <h3 className="bg-slate-950 py-2 px-3 rounded-lg">
                      {" "}
                      Gluten Free
                    </h3>
                  ) : (
                    ""
                  )}

                  {ViewInfo.diets.map((element: any, index: any) => (
                    <div key={index}>
                      <h3 className="  bg-slate-950  p-2 rounded-lg   ">
                        {element}
                      </h3>
                    </div>
                  ))}

                  <div className="flex gap-3 items-center justify-around flex-wrap">
                    {ViewInfo.cuisines.map((item: any, index: any) => (
                      <li
                        className=" list-none bg-slate-950  p-2 rounded-lg "
                        key={index}
                      >
                        {index + 1} {item}
                      </li>
                    ))}
                  </div>
                </div>
                <h3 className="text-xl">
                  Yeild : {ViewInfo.servings} servings{" "}
                </h3>
              </div>
            </div>

            <div className="mb-3">
              <h3 className="text-xl font-thin mb-2">Can be Eaten as : </h3>
              <div className="flex items-center justify-evenly flex-wrap gap-5 mb-2        ">
                {ViewInfo.dishTypes.map((item: any, index: any) => (
                  <li
                    key={index}
                    className=" list-none bg-slate-950 px-3 py-2 rounded-lg "
                  >
                    {item}
                  </li>
                ))}
              </div>
            </div>

            {/* Ingredients Section */}
            <section className="  mb-3">
              <h4 className="text-2xl">Ingredients : </h4>
              <div className=" grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-1 p-5  ">
                {ViewInfo.extendedIngredients.map((item: any, index: any) => (
                  <div key={index} className="">
                    <h4>
                      {index + 1}. {item.nameClean}
                    </h4>
                  </div>
                ))}
              </div>
            </section>

            {/* Preparations Section */}
            <section className="bg-slate-900 max-w-5xl">
              {ViewInfo.analyzedInstructions[0]?.steps && (
                <>
                  <h4 className="text-2xl">Instructions: </h4>
                  <div>
                    {ViewInfo.analyzedInstructions[0]?.steps.map(
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
                  <Link href={ViewInfo.sourceUrl}> {ViewInfo.sourceName}</Link>
                </h3>
              </div>
            </section>
          </section>
        </div>
      )}
    </main>
  );
}

export default DisplayRecipeInfo;

export async function getServerSideProps({ query }: any) {
  const { id } = query;
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    headers: {
      "x-api-key": apikey,
    },
  };
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information`,
    config
  );

  let data = response.data;
  return {
    props: {
      data,
    },
  };
}
