import { GraphQLClient } from "graphql-request";
import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { removeDashAndCapitalise } from "~/utils/utils";
import SearchIcon from "~/ui/SearchIcon";

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
                    placeholder="Enter Pokemon name"
                    className="w-full px-2 mr-2"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />
                <button onClick={handleSearch} className="ml-auto">
                    <SearchIcon />
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
