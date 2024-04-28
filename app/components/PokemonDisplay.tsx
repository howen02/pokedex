import React from "react";
import PokemonCard from "./PokemonCard";

interface PokemonDisplayProps {
    pokedexJSON: any[];
}

const PokemonDisplay: React.FC<PokemonDisplayProps> = ({ pokedexJSON }) => {
    console.log(pokedexJSON);
    return (
        <div className="flex flex-col items-center bg-slate-100 min-h-screen pb-6">
            <h1 className="font-bold text-4xl my-6">Pokemon Owned</h1>
            {pokedexJSON ? (
                pokedexJSON.pokemon_v2_pokemon.map((pokemon: any) => (
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
                ))
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default PokemonDisplay;
