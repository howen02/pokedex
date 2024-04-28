interface PokemonCardProps {
    name: string;
    type: string[];
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, type}) => {
    return (
        <div className="flex items-center border-2 border-black w-1/2 p-4">
            <div className="w-1/3">Pokemon Image</div>
            <div>
                <div>{name}</div>
                <div>{type}</div>
            </div>
        </div>
    );
};

export default PokemonCard;
