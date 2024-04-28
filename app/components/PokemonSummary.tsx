import React from "react";
import { capitaliseString } from "~/utils/utils";
import PokemonTypeCard from "./PokemonTypeCard";

interface PokemonSummaryProps {
    name: string;
    types: any[];
    baseExperience: number;
    height: number;
    weight: number;
    spriteUrl: string;
}

const PokemonSummary: React.FC<PokemonSummaryProps> = ({
    name,
    types,
    baseExperience,
    height,
    weight,
    spriteUrl,
}) => {
    return (
        <div className="flex flex-col items-left mx-20 ">
            <h1 className="text-4xl font-bold">
                {capitaliseString(name)}
            </h1>
            <div className="flex gap-8 text-xl font-semibold my-2">
                <img
                    src={spriteUrl}
                    alt={name}
                    width={300}
                    height={300}
                    className="bg-slate-100 rounded-lg"
                />
                <div>
                    <div className="flex">
                        <PokemonTypeCard types={types} />
                    </div>

                    <div className="flex gap-2">
                        <div className="text-end">
                            Base Experience <br />
                            Height <br />
                            Weight <br />
                        </div>
                        <div>
                            {baseExperience} <br />
                            {height} <br />
                            {weight} <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonSummary;
