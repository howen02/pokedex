import { GraphQLClient } from "graphql-request";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@remix-run/react";
import { removeDashAndCapitalise } from "~/utils/utils";
import SearchIcon from "~/ui/SearchIcon";
import debounce from "lodash/debounce";

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
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleDropdownItemClick = (pokemonId: number) => {
        navigate(`/pokemons/${pokemonId}`);
        setSearchResults([]);
        setIsOpen(false);
    };

    const handleSearch = async () => {
        const data: any = await client.request(PokeAPIquery, {
            searchQuery: `${searchQuery.trim().toLowerCase()}%`,
        });
        setSearchResults(data.pokemon_v2_pokemon);
        setIsOpen(true);
    };
    const delayedHandleSearch = debounce(handleSearch, 500);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="bg-white p-2 w-1/3 rounded-lg relative" ref={dropdownRef}>
            <div className="flex">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        delayedHandleSearch();
                    }}
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
            {isOpen && searchResults.length > 0 && (
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
