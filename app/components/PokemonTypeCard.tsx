import { capitaliseString } from "~/utils/utils";

const getTypeColor = (typeId: number) => {
    const typeColorMap: Record<number, string> = {
        1: "bg-slate-400", // normal
        2: "bg-orange-600", // fighting
        3: "bg-violet-400", // flying
        4: "bg-purple-700", // poison
        5: "bg-yellow-700", // ground
        6: "bg-yellow-400", // rock
        7: "bg-lime-600", // bug
        8: "bg-violet-900", // ghost
        9: "bg-stone-400", // steel
        10: "bg-red-500", // fire
        11: "bg-blue-500", // water
        12: "bg-green-600", // grass
        13: "bg-yellow-300", // electric
        14: "bg-pink-500", // psychic
        15: "bg-sky-200", // ice
        16: "bg-violet-700", // dragon
        17: "bn-yellow-950", // dark
        18: "bg-red-200", // fairy
        10002: "", // shadow
    };

    return typeColorMap[typeId] || "slate-400";
};

const PokemonTypeCard = ({ types }: { types: any[] }) => {
    return (
        <div className="flex flex-wrap gap-2">
            {types.map((item, index) => (
                <div
                    key={index}
                    className={`text-white px-3 py-1 rounded-md font-bold ${getTypeColor(
                        item.pokemon_v2_type.id
                    )}`}
                >
                    {capitaliseString(item.pokemon_v2_type.name)} <br/>
                </div>
            ))}
        </div>
    );
};

export default PokemonTypeCard;
