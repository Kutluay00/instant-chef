export const RecipeResult: React.FC<{
    recipe: { title: string, ingredients: string[], instructions: string[] },
    imgUrl: string
}> = ({ recipe, imgUrl }) => {
    return (
        <div className="flex flex-col w-1/3 bg-slate-200/40 rounded-md">
            <img src={imgUrl} alt={recipe.title} className="w-full rounded-t-md" />
            <div className="w-full px-4 py-2">
                <h1 className="text-4xl font-bold underline underline-offset-4 w-full text-center">{recipe.title}</h1>
                <h2 className="text-2xl font-semibold underline">Ingredients</h2>
                <ul className="list-disc list-inside ml-4">
                    {
                        recipe.ingredients.map((ingredient, i) => <li key={i}>{ingredient}</li>)
                    }
                </ul>
                <h2 className="text-2xl font-semibold underline">Instructions</h2>
                <ol className="list-decimal list-inside ml-4">
                    {
                        recipe.instructions.map((instruction, i) => <li key={i}>{instruction}</li>)
                    }
                </ol>
            </div>
        </div>
    );
}