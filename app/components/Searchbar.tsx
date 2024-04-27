import { GraphQLClient } from "graphql-request";
import { useEffect, useState } from "react";

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

client.request(PokeAPIquery, { searchQuery: "char%" });

const Searchbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<PokemonSearchData[]>([]);

    const handleSearch = async () => {
        const data: any = await client.request(PokeAPIquery, {
            searchQuery: `${searchQuery}%`,
        });
        setSearchResults(data.pokemon_v2_pokemon);
    };

    const handleClickOutside = () => {
        setSearchResults([]);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-white p-2 w-1/3 rounded-lg relative">
            <div className="flex">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter Pokémon name"
                    className="w-full px-2"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />
                <button onClick={handleSearch} className="ml-auto px-2">
                    🔍
                </button>
            </div>
            {searchResults.length > 0 && (
                <div className="absolute w-full left-0 bg-white shadow-md">
                    <ul>
                        {searchResults.map((pokemon: PokemonSearchData) => (
                            <li
                                key={pokemon.id}
                                className="p-2 cursor-pointer hover:bg-gray-200"
                            >
                                {pokemon.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Searchbar;
