import type { MetaFunction } from "@remix-run/node";
import PokemonDisplay from "~/components/PokemonDisplay";
import { GraphQLClient } from "graphql-request";
import { useEffect, useState } from "react";
import Loading from "~/components/Loading";

const client = new GraphQLClient("https://beta.pokeapi.co/graphql/v1beta");

const PokeAPIquery = `
    query MyQuery {
        pokemon_v2_pokemon(where: {id: {_in: [1, 2, 3, 4, 5, 6, 7, 8, 9]}}) {
        name
        id
        pokemon_v2_pokemontypes {
            pokemon_v2_type {
                name
                id
            }
        }
        pokemon_v2_pokemonsprites {
            sprites
        }
        }
    }
`;

export const meta: MetaFunction = () => {
    return [
        { title: "Pokedex App" },
        { name: "description", content: "Find your favourite pokemon!" },
    ];
};

export default function Index() {
    const [pokedexData, setPokedexData] = useState<any>(null);

    useEffect(() => {
        const storedTeamIds = localStorage.getItem("team");
        const initialTeamIds: number[] = storedTeamIds
            ? storedTeamIds
                  .split(",")
                  .map((idString) => parseInt(idString.trim(), 10))
                  .filter((n) => !isNaN(n))
            : [];

        const fetchData = async () => {
            console.log(initialTeamIds);

            try {
                const data: any = await client.request(PokeAPIquery, {
                    // ids: initialTeamIds,
                });
                console.log(data);
                setPokedexData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    if (!pokedexData) {
        return <Loading />;
    }

    return (
        <div>
            {pokedexData ? (
                <PokemonDisplay pokedexJSON={pokedexData} />
            ) : (
                <div></div>
            )}
        </div>
    );
}
