import { type NextPage } from "next";
import { RecipeConstraintWidget } from "~/components/RecipeConstraintWidget";

const Home: NextPage = () => {

  return (
      <main className="w-screen h-screen bg-gradient-to-t from-[#B7410E] to-[#FFD700] overflow-y-auto overflow-x-hidden">
        <RecipeConstraintWidget />
      </main>
  );
};

export default Home;
