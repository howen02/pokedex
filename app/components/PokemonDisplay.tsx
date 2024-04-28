import React from "react";
import PokemonCard from "./PokemonCard";

const PokemonDisplay: React.FC<{}> = () => {
    const dummyPokemons = [
        { id: 1, name: "Pikachu", type: ["Electric"] },
        { id: 2, name: "Charmander", type: ["Fire"] },
        { id: 3, name: "Bulbasaur", type: ["Grass", "Poison"] },
        { id: 4, name: "Squirtle", type: ["Water"] },
        { id: 5, name: "Jigglypuff", type: ["Normal", "Fairy"] },
        { id: 6, name: "Snorlax", type: ["Normal"] },
    ];

    return (
        <div className="flex flex-col items-center bg-slate-100 min-h-screen">
            <h1 className="font-bold text-4xl my-6">Pokemon Owned</h1>
            {dummyPokemons.map((pokemon) => (
                <PokemonCard
                    key={pokemon.id}
                    name={pokemon.name}
                    type={pokemon.type}
                />
            ))}
        </div>
    );
};

export default PokemonDisplay;
