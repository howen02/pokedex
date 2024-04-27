import type { MetaFunction } from "@remix-run/node";
import Navbar from "~/components/Navbar";
import PokemonDisplay from "~/components/PokemonDisplay";

export const meta: MetaFunction = () => {
    return [
        { title: "Pokedex App" },
        { name: "description", content: "Find your favourite pokemon!" },
    ];
};

export default function Index() {
    return (
        <div className="flex flex-col justify-center">
            <Navbar />
            <PokemonDisplay />
        </div>
    );
}
