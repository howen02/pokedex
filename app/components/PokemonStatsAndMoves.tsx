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
            <div className="flex ml-20 text-slate-100 font-bold">
                <button
                    onClick={() => {
                        setToggleStatMove(false);
                    }}
                    className="bg-blue-900 py-1 px-4 rounded-t-lg text-xl hover:text-yellow-400"
                >
                    Stats
                </button>
                <button
                    onClick={() => {
                        setToggleStatMove(true);
                    }}
                    className="bg-yellow-400  py-1 px-4 rounded-t-lg text-xl hover:text-blue-900"
                >
                    Moves
                </button>
            </div>
            <div className="h-full">
                <div
                    className={`bg-blue-900 px-4 py-8 h-full ${
                        toggleStatMove ? "hidden" : ""
                    }`}
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
                    className={`bg-yellow-400 grid grid-cols-3 gap-4 p-8 max-h-80 overflow-y-auto ${
                        toggleStatMove ? "" : "hidden"
                    }`}
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
