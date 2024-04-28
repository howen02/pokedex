import React from "react";
import PokemonCard from "./PokemonCard";
import { useNavigate } from "@remix-run/react";

interface PokemonDisplayProps {
    pokedexJSON: any[];
}

const PokemonDisplay: React.FC<PokemonDisplayProps> = ({ pokedexJSON }) => {
    const pokedexData = pokedexJSON.pokemon_v2_pokemon;


    return (
        <div className="flex flex-col items-center bg-slate-100 min-h-screen pb-6">
            <h1 className="font-bold text-4xl my-6">Pokemon Owned</h1>
            {pokedexData
                ? pokedexData.map((pokemon: any) => (
                      <PokemonCard
                          key={pokemon.id}
                          id={pokemon.id}
                          name={pokemon.name}
                          types={pokemon.pokemon_v2_pokemontypes}
                          spriteUrl={
                              pokemon.pokemon_v2_pokemonsprites[0].sprites
                                  .front_default
                          }
                          onClick={() => handleNavigatePokemon(pokemon.id)}
                      />
                  ))
                : ""}
        </div>
    );
};

export default PokemonDisplay;
