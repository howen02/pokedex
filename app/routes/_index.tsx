import { useState } from 'react';
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
    const [pokemonData, setPokemonData] = useState<any[]>([]);

    const handlePokemonData = (data: any[]) => {
        setPokemonData(data);
    };

    return (
        <div className="flex flex-col justify-center">
            <Navbar onPokemonData={handlePokemonData} />
            <PokemonDisplay pokemonData={pokemonData} />
        </div>
    );
}
