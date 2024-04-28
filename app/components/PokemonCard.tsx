import { removeDashAndCapitalise } from "~/utils/utils";
import PokemonTypeCard from "./PokemonTypeCard";
import { useNavigate } from "@remix-run/react";

interface PokemonCardProps {
    id: number;
    name: string;
    types: string[];
    spriteUrl: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
    id,
    name,
    types,
    spriteUrl,
}) => {
    const navigate = useNavigate();

    function handleNavigatePokemon(pokemonId: number) {
        navigate(`/pokemons/${pokemonId}`);
    }
    
    return (
        <div
            className="flex items-center w-1/2 p-4 gap-4 shadow-lg rounded-lg bg-white hover:scale-105 hover:cursor-pointer"
            onClick={() => handleNavigatePokemon(id)}
        >
            <img src={spriteUrl} className="" width={200} height={200} />
            <div>
                <div className="text-3xl font-medium">
                    {removeDashAndCapitalise(name)}
                </div>
                <div className="flex gap-2 mt-2">
                    <PokemonTypeCard types={types} />
                </div>
            </div>
        </div>
    );
};

export default PokemonCard;
