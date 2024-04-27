interface PokemonCardProps {
    name: string;
    type: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({name, type}) => {
    return (
        <div className="flex border-2 border-black">
            <div>Pokemon Image</div>
            <div>
                <div>{name}</div>
                <div>{type}</div>
            </div>
        </div>
    );
};

export default PokemonCard;
