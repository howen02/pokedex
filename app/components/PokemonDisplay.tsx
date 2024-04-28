import React from "react";
import PokemonCard from "./PokemonCard";

interface PokemonType {
    id: number;
    name: string;
}

interface PokemonSprites {
    sprites: {
        front_default: string;
    }[];
}

interface Pokemon {
    id: number;
    name: string;
    pokemon_v2_pokemontypes: PokemonType[];
    pokemon_v2_pokemonsprites: PokemonSprites[];
}

interface PokemonDisplayProps {
    pokedexJSON: {
        pokemon_v2_pokemon: Pokemon[];
    };
}

const PokemonDisplay: React.FC<PokemonDisplayProps> = ({ pokedexJSON }) => {
    if (!pokedexJSON) return <div></div>;
    return (
        <div className="flex flex-col items-center bg-slate-100 min-h-screen pb-6">
            <h1 className="font-bold text-4xl my-6 ">Pokemon Owned</h1>
            <div className="w-full flex flex-col items-center gap-4">
                {pokedexJSON.pokemon_v2_pokemon.map((pokemon: any) => (
                    <PokemonCard
                        key={pokemon.id}
                        id={pokemon.id}
                        name={pokemon.name}
                        types={pokemon.pokemon_v2_pokemontypes}
                        spriteUrl={
                            pokemon.pokemon_v2_pokemonsprites[0].sprites
                                .front_default
                        }
                    />
                ))}
            </div>
        </div>
    );
};

export default PokemonDisplay;
