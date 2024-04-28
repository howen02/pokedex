import { capitaliseString } from "~/utils/utils";
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
            className="flex items-center border-2 border-black w-1/2 p-4 gap-4"
            onClick={() => handleNavigatePokemon(id)}
        >
            <img src={spriteUrl} className="" width={150} height={150} />
            <div>
                <div className="text-2xl font-medium">
                    {capitaliseString(name)}
                </div>
                <div className="flex gap-2 mt-2">
                    <PokemonTypeCard types={types} />
                </div>
            </div>
        </div>
    );
};

export default PokemonCard;
