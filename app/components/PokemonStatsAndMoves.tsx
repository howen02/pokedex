import { useState } from "react";

const PokemonStatsAndMoves = () => {
    const [toggleStatMove, setToggleStatMove] = useState(false);

    return (
        <div className="flex flex-col h-full">
            <div className="flex ml-20 gap-2">
                <button
                    onClick={() => {
                        setToggleStatMove(false);
                    }}
                    className="bg-blue-500 py-1 px-2 rounded-t-lg font-semibold"
                >
                    Stats
                </button>
                <button
                    onClick={() => {
                        setToggleStatMove(true);
                    }}
                    className="bg-red-500 py-1 px-2 rounded-t-lg font-semibold"
                >
                    Moves
                </button>
            </div>
            <div className="flex-1">
                <div
                    className={`${toggleStatMove ? "hidden" : ""} bg-blue-500 p-4 h-full`}
                >
                    <p>hp</p>
                    <p>attack</p>
                    <p>defence</p>
                    <p>special attack</p>
                    <p>special defence</p>
                    <p>speed</p>
                </div>
                <div className={`${toggleStatMove ? "" : "hidden"} bg-red-500 p-4 h-full`}>
                    MOVES
                </div>
            </div>
        </div>
    );
};

export default PokemonStatsAndMoves;
