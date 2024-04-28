import { useEffect, useState } from "react";
import Statbar from "./Statbar";
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("https://beta.pokeapi.co/graphql/v1beta");
const PokeAPIquery = `
    query MyQuery {
        pokemon_v2_pokemon {
            pokemon_v2_pokemonstats(where: {pokemon_id: {_eq: 1}}) {
                base_stat
                pokemon_v2_stat {
                    name
                }
            }
        }
    }
  `;

const PokemonStatsAndMoves = ({ pokemonId }: { pokemonId: number }) => {
    const [toggleStatMove, setToggleStatMove] = useState(false);
    const [pokemonStatJSON, setPokemonStatJSON] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: any = await client.request(PokeAPIquery, {
                    id: 1,
                });
                setPokemonStatJSON(data);
                console.log(data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [pokemonId]);

    if (!pokemonStatJSON) {
        return <div></div>;
    }

    const pokemonStatData =
        pokemonStatJSON.pokemon_v2_pokemon.pokemon_v2_pokemonstats;
    const [
        { base_stat: hp },
        { base_stat: attack },
        { base_stat: defense },
        { base_stat: specialAttack },
        { base_stat: specialDefense },
        { base_stat: speed },
    ] = pokemonStatData;

    return (
        <div className="flex flex-col h-full">
            <div className="flex ml-20">
                <button
                    onClick={() => {
                        setToggleStatMove(false);
                    }}
                    className="bg-blue-500 py-1 px-4 rounded-t-lg text-xl font-semibold"
                >
                    Stats
                </button>
                <button
                    onClick={() => {
                        setToggleStatMove(true);
                    }}
                    className="bg-red-500 py-1 px-4 rounded-t-lg text-xl font-semibold"
                >
                    Moves
                </button>
            </div>
            <div className="flex-1">
                <div
                    className={`${
                        toggleStatMove ? "hidden" : ""
                    } bg-blue-500 p-4 h-full`}
                >
                    <Statbar statName="HP" statValue={hp} />
                    <Statbar statName="Attack" statValue={attack} />
                    <Statbar statName="Defence" statValue={defense} />
                    <Statbar statName="Special Attack" statValue={specialAttack} />
                    <Statbar statName="Special Defence" statValue={specialDefense} />
                    <Statbar statName="Speed" statValue={speed} />
                </div>
                <div
                    className={`${
                        toggleStatMove ? "" : "hidden"
                    } bg-red-500 p-4 h-full`}
                >
                    MOVES
                </div>
            </div>
        </div>
    );
};

export default PokemonStatsAndMoves;
