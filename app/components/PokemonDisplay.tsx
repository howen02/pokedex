import React from "react";

const PokemonDisplay: React.FC<{}> = () => {
    return (
        <div className="flex flex-col items-center bg-slate-100 min-h-screen">
            <h1 className="font-bold text-4xl my-6">Pokemon Owned</h1>
        </div>
    );
};

export default PokemonDisplay;
