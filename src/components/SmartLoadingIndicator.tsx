import { useEffect, useState } from "react";
import Spinner from "./Spinner";

const funnyMessages = [
    "Baking a batch of code cookies...",
    "Blending the pixel smoothie...",
    "Boiling the data broth...",
    "Braising the code brisket...",
    "Brewing the digital espresso...",
    "Broiling the byte burger...",
    "Caramelizing the code onions...",
    "Chopping the virtual onions...",
    "Cooking up a storm in the server kitchen...",
    "Decanting the data wine...",
    "Frying up a binary breakfast...",
    "Grating the data cheese...",
    "Infusing the data tea...",
    "Just a moment, we're cooking up something good...",
    "Kneading the algorithm dough...",
    "Melting the information cheese...",
    "Peeling back the layers of code...",
    "Plating the pixel pasta...",
    "Poaching the pixel eggs...",
    "Preparing the pixel pie...",
    "Raising the tech toast...",
    "Roasting the server roast...",
    "Sautéing a byte of data...",
    "Searing the data steak...",
    "Seasoning the software stew...",
    "Simmering the binary soup...",
    "Steaming the software dumplings...",
    "Tossing the data salad...",
    "Whipping up a tech soufflé...",
];

const funnyMessagesWithRecipeTitle = [
    "Stay tuned! We're just adding the final touches to your delicious {recipeName} recipe.",
    "Our chef is busy tweaking the {recipeName} recipe to perfection. Hold tight!",
    "We're whipping up your {recipeName} to be just right. Please wait!",
    "Hang tight! We're stirring the pot for the best {recipeName} you've ever tasted.",
    "You asked for {recipeName}? You got it! Just giving it a final stir.",
    "Your {recipeName} is in the oven. Can you smell it already?",
    "The secret to a good {recipeName} is patience. Just a little longer!",
    "Fine-tuning your {recipeName}. Hang on!",
    "Our chef is putting the final garnish on your {recipeName}. Stand by!",
    "We're kneading the dough of information for your perfect {recipeName}!",
]

export const SmartLoadingIndicator: React.FC<{ recipeTitle?: string }> = ({ recipeTitle }) => {
    const [message, setMessage] = useState(funnyMessages[0]);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setFade(true);
            setTimeout(() => {
                let randomIndex;
                let newMessage;

                do {
                    if (recipeTitle) {
                        randomIndex = Math.floor(Math.random() * funnyMessagesWithRecipeTitle.length);
                        newMessage = funnyMessagesWithRecipeTitle[randomIndex]?.replaceAll('{recipeName}', recipeTitle);
                    } else {
                        randomIndex = Math.floor(Math.random() * funnyMessages.length);
                        newMessage = funnyMessages[randomIndex];
                    }
                } while (newMessage === message);
                setMessage(newMessage);
                setFade(false);
            }, 500);
        }, 3000);

        return () => {
            clearInterval(intervalId);
        };
    }, [message, recipeTitle]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <Spinner />
            <h1 className={`text-4xl text-center font-bold italictext-white/80 transition-opacity duration-500 ease-in-out ${fade ? 'opacity-0' : 'opacity-100'}`}>
                {message}
            </h1>
        </div>
    );
}