import React from "react";
import PokemonCard from "./PokemonCard";

const PokemonDisplay: React.FC<{}> = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-4xl my-6">Pokemon Owned</h1>
        </div>
    );
};

export default PokemonDisplay;
