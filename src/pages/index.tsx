import { type NextPage } from "next";
import { RecipeConstraintWidget } from "~/components/RecipeConstraintWidget";

const Home: NextPage = () => {

  return (
      <main className="w-screen h-screen flex items-center justify-center bg-gradient-to-t from-[#B7410E] to-[#FFD700]">
        <RecipeConstraintWidget />
      </main>
  );
};

export default Home;
