import { useEffect, useState } from "react";
import { useParams } from "@remix-run/react";
import { GraphQLClient } from "graphql-request";
import PokemonStatsAndMoves from "~/components/PokemonStatsAndMoves";
import PokemonSummary from "~/components/PokemonSummary";
import Loading from "~/components/Loading";

const client = new GraphQLClient("https://beta.pokeapi.co/graphql/v1beta");

const PokeAPIquery = `
    query MyQuery($id: Int!) {
        pokemon_v2_pokemon(where: {id: {_eq: $id}}) {
        name
            weight
            height
            base_experience

            pokemon_v2_pokemonstats {
                base_stat
                pokemon_v2_stat {
                  name
                }
              }
        }

        pokemon_v2_pokemonformsprites(where: {id: {_eq: $id}}) {
            sprites
        }
        
        pokemon_v2_pokemontype(where: {pokemon_id: {_eq: $id}}) {
            pokemon_v2_type {
                name
                id
            }
        }
    }
`;

export default function PokemonID() {
    const [pokemonJSON, setPokemonJSON] = useState<any>(null);
    const params = useParams();
    const pokemonId = parseInt(params.id || "");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: any = await client.request(PokeAPIquery, {
                    id: pokemonId,
                });
                setPokemonJSON(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [pokemonId]);

    if (!pokemonJSON) {
        return <Loading />;
    }

    const pokemonData = pokemonJSON.pokemon_v2_pokemon[0];
    const spriteUrl =
        pokemonJSON.pokemon_v2_pokemonformsprites[0].sprites.front_default;
    const pokemonTypesData = pokemonJSON.pokemon_v2_pokemontype;
    const pokemonStatsData = pokemonJSON.pokemon_v2_pokemon[0].pokemon_v2_pokemonstats

    return (
        <div className="flex h-screen flex-col pt-5">
            <div className="h-1/2 mx-20">
                <PokemonSummary
                    name={pokemonData.name}
                    types={pokemonTypesData}
                    baseExperience={pokemonData.base_experience}
                    height={pokemonData.height}
                    weight={pokemonData.weight}
                    spriteUrl={spriteUrl}
                />
            </div>
            <div className="h-1/2 flex-grow">
                <PokemonStatsAndMoves stats={pokemonStatsData} />
            </div>
        </div>
    );
}
