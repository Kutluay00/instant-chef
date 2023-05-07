import { useState } from "react";
import { RecipeConstraintForm } from "./RecipeConstraintForm";

export const RecipeConstraintWidget: React.FC = () => {
    const [constraints, setConstraints] = useState<string[]>([]);

    return (
        <div className="w-full md:w-1/3 p-2 bg-slate-500 flex flex-col items-center gap-2">
            <ul className="flex gap-2 flex-wrap justify-center">
                {constraints.map((constraint, i) => (
                    <li className="bg-white p-2 flex gap-2 items-center" key={i}>
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
            <RecipeConstraintForm
                onSubmit={(values) => {
                    if (values.constraint.trim() !== "") {
                        setConstraints((prevConstraints) => ([...prevConstraints, values.constraint]))
                    }
                }}
                className="w-full"
            />
            <button className="p-2 rounded-md bg-white">Get a Recipe!</button>
        </div>
    );
}