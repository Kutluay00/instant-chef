import { useState } from "react";
import { RecipeConstraintForm } from "./RecipeConstraintForm";

export const RecipeConstraintWidget: React.FC = () => {
    const [constraints, setConstraints] = useState<string[]>([]);

    return (
        <div className="w-full md:w-1/3 p-2 flex flex-col items-center gap-12">
            <div className="w-full">
                {
                    constraints.length > 0 && (
                        <>
                            <h2 className="text-xl text-gray-800 font-bold mb-2 italic">Constraints:</h2>
                            <ul className="flex w-full gap-2 flex-wrap justify-start items-start">
                                {constraints.map((constraint, i) => (
                                    <li className="px-4 py-2 flex gap-2 items-center bg-gray-200 text-gray-800 rounded italic" key={i}>
                                        {constraint}
                                        <button
                                            onClick={() => {
                                                setConstraints((prevConstraints) => [...(prevConstraints.filter((_, j) => j !== i))])
                                            }}
                                            className="text-md font-bold transition-colors hover:text-red-500"
                                        >
                                            &times;
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )
                }
            </div>
            <RecipeConstraintForm
                onSubmit={(values) => {
                    if (values.constraint.trim() !== "") {
                        setConstraints((prevConstraints) => ([...prevConstraints, values.constraint]))
                    }
                }}
                className="w-full"
            />
            <button className="bg-indigo-600 text-gray-200 text-lg font-semibold px-4 py-2 rounded border border-transparent hover:border-indigo-400 hover:bg-indigo-700 transition-colors">
                Get a Recipe!
            </button>
        </div>
    );
}