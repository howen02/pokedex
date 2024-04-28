import { Suspense, useEffect, useState } from "react";
import { useParams } from "@remix-run/react";
import { GraphQLClient } from "graphql-request";
import PokemonStatsAndMoves from "~/components/PokemonStatsAndMoves";
import PokemonSummary from "~/components/PokemonSummary";
import { removeDashAndCapitalise } from "~/utils/utils";
import Loading from "~/components/Loading";

const client = new GraphQLClient("https://beta.pokeapi.co/graphql/v1beta");

const PokeAPIquery = `
    query MyQuery($id: Int!) {
        pokemon_v2_pokemon(where: {id: {_eq: $id}}) {
        name
            weight
            height
            base_experience

            pokemon_v2_pokemonmoves(order_by: {level: asc}) {
                level
                pokemon_v2_move {
                  name
                }
            }

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
        document.body.classList.add("overflow-y-hidden");
        return () => {
            document.body.classList.remove("overflow-y-hidden");
        };
    }, []);

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
    const pokemonStatsData =
        pokemonJSON.pokemon_v2_pokemon[0].pokemon_v2_pokemonstats;
    const pokemonMovesData =
        pokemonJSON.pokemon_v2_pokemon[0].pokemon_v2_pokemonmoves;

    return (
        <div className="flex h-screen flex-col overflow-hidden">
            <div className="h-1/2 mx-20 mt-10">
                <PokemonSummary
                    name={removeDashAndCapitalise(pokemonData.name)}
                    id={pokemonId}
                    types={pokemonTypesData}
                    baseExperience={pokemonData.base_experience}
                    height={pokemonData.height}
                    weight={pokemonData.weight}
                    spriteUrl={spriteUrl}
                />
            </div>
            <div className="flex-grow">
                <PokemonStatsAndMoves
                    stats={pokemonStatsData}
                    moves={pokemonMovesData}
                />
            </div>
        </div>
    );
}
