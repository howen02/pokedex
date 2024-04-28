import { GraphQLClient } from "graphql-request";
import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { removeDashAndCapitalise } from "~/utils/utils";

interface PokemonSearchData {
    id: number;
    name: string;
}

const client = new GraphQLClient("https://beta.pokeapi.co/graphql/v1beta");
const PokeAPIquery = `
  query PokeAPIquery($searchQuery: String!) {
    pokemon_v2_pokemon(where: {name: {_like: $searchQuery}}) {
      id
      name
    }
  }
`;

const Searchbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<PokemonSearchData[]>([]);

    const navigate = useNavigate();
    const handleDropdownItemClick = (pokemonId: number) => {
        navigate(`/pokemons/${pokemonId}`);
        setSearchResults([]);
    };

    const handleSearch = async () => {
        const data: any = await client.request(PokeAPIquery, {
            searchQuery: `${searchQuery.trim().toLowerCase()}%`,
        });
        setSearchResults(data.pokemon_v2_pokemon);
    };

    return (
        <div className="bg-white p-2 w-1/3 rounded-lg relative">
            <div className="flex">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter Pokémon name"
                    className="w-full px-2 mr-2"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />
                <button onClick={handleSearch} className="ml-auto">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="20"
                        height="20"
                        viewBox="0 0 50 50"
                    >
                        <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
                    </svg>
                </button>
            </div>
            {searchResults.length > 0 && (
                <div className="absolute w-full left-0 bg-white shadow-md overflow-y-auto max-h-80">
                    <ul>
                        {searchResults.map((pokemon: PokemonSearchData) => (
                            <li
                                key={pokemon.id}
                                className="p-2 cursor-pointer hover:bg-gray-200"
                                onClick={() => {
                                    handleDropdownItemClick(pokemon.id);
                                }}
                            >
                                {removeDashAndCapitalise(pokemon.name)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Searchbar;
