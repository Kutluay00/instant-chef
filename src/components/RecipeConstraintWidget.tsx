import { useEffect, useState } from "react";
import { RecipeConstraintForm } from "./RecipeConstraintForm";
import { api } from "~/utils/api";
import { RecipeResult } from "./RecipeResult";

export const RecipeConstraintWidget: React.FC = () => {
  const [constraints, setConstraints] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<{ title: string, ingredients: string[], instructions: string[] }>();
  const { data, mutate } = api.openai.chatgpt.useMutation();
  const { data: dalleData, mutate: dalleMutate } = api.openai.dalle.useMutation();

  const handleSubmission = () => {
    mutate({ messages: constraints });
  };


  useEffect(() => {
    if (data) {
      console.log(data);
      const stringToParse = `{${data.split("{")[1]?.split("}")[0]}}`;
      const lol = JSON.parse(stringToParse);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      setRecipe(lol);

      const title = lol.title;
      console.log(title);
      dalleMutate({ title: title });
    }
  }, [data]);

  useEffect(() => {
    if (dalleData) {
      console.log(dalleData);
    }
  }, [dalleData]);

  return (
    <>
      {
        recipe && dalleData ? (
          <RecipeResult
            recipe={recipe}
            imgUrl={dalleData}
          />
        ) : (
          <div className="flex w-full flex-col items-center gap-12 p-2 md:w-1/3">
            <div className="w-full">
              {constraints.length > 0 && (
                <>
                  <h2 className="mb-2 text-xl font-bold italic text-gray-800">
                    Constraints:
                  </h2>
                  <ul className="flex w-full flex-wrap items-start justify-start gap-2">
                    {constraints.map((constraint, i) => (
                      <li
                        className="flex items-center gap-2 rounded bg-gray-200 px-4 py-2 italic text-gray-800"
                        key={i}
                      >
                        {constraint}
                        <button
                          onClick={() => {
                            setConstraints((prevConstraints) => [
                              ...prevConstraints.filter((_, j) => j !== i),
                            ]);
                          }}
                          className="text-md font-bold transition-colors hover:text-red-500"
                        >
                          &times;
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <RecipeConstraintForm
              onSubmit={(values) => {
                if (values.constraint.trim() !== "") {
                  setConstraints((prevConstraints) => [
                    ...prevConstraints,
                    values.constraint,
                  ]);
                }
              }}
              className="w-full"
            />
            <button
              onClick={handleSubmission}
              className="rounded border border-transparent bg-indigo-600 px-4 py-2 text-lg font-semibold text-gray-200 transition-colors hover:border-indigo-400 hover:bg-indigo-700"
            >
              Get a Recipe!
            </button>
          </div>
        )
      }
    </>
  );
};
