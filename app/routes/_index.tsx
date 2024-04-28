import type { MetaFunction } from "@remix-run/node";
import { GraphQLClient } from "graphql-request";
import PokemonDisplay from "~/components/PokemonDisplay";

export const meta: MetaFunction = () => {
    return [
        { title: "Pokedex App" },
        { name: "description", content: "Find your favourite pokemon!" },
    ];
};

export default function Index() {
    return <PokemonDisplay />;
}
