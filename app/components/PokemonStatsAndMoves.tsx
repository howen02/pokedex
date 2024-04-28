import { useState } from "react";
import Statbar from "./Statbar";
import MoveCard from "./MoveCard";

interface PokemonStatsAndMovesProps {
    stats: any[];
    moves: any[];
}

const PokemonStatsAndMoves: React.FC<PokemonStatsAndMovesProps> = ({
    stats,
    moves,
}) => {
    const [toggleStatMove, setToggleStatMove] = useState(false);

    return (
        <div className="flex flex-col h-full">
            <div className="flex ml-20">
                <button
                    onClick={() => {
                        setToggleStatMove(false);
                    }}
                    className="bg-blue-500 py-1 px-4 rounded-t-lg text-xl font-medium"
                >
                    Stats
                </button>
                <button
                    onClick={() => {
                        setToggleStatMove(true);
                    }}
                    className="bg-red-500 py-1 px-4 rounded-t-lg text-xl font-medium"
                >
                    Moves
                </button>
            </div>
            <div className="flex-1">
                <div
                    className={`${
                        toggleStatMove ? "hidden" : ""
                    } bg-blue-500 p-4 h-full`}
                >
                    {stats.map((stat, index) => (
                        <Statbar
                            key={index}
                            statName={stat.pokemon_v2_stat.name}
                            statValue={stat.base_stat}
                        />
                    ))}
                </div>
                <div
                    className={`${
                        toggleStatMove ? "" : "hidden"
                    } bg-red-500 h-full grid grid-cols-3 gap-4 p-8`}
                >
                    {moves.map((move, index) => (
                        <MoveCard
                            key={index}
                            moveName={move.pokemon_v2_move.name}
                            moveLevel={move.level}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PokemonStatsAndMoves;
