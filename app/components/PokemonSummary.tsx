import React, { useState } from "react";
import PokemonTypeCard from "./PokemonTypeCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    parseLocalStorageString,
    removeDashAndCapitalise,
} from "~/utils/utils";

interface PokemonSummaryProps {
    id: number;
    spriteUrl: string;
    summaryData: any;
    types: any[];
}

const PokemonSummary: React.FC<PokemonSummaryProps> = ({
    id,
    spriteUrl,
    summaryData,
    types,
}) => {
    const {
        name: rawName,
        weight,
        height,
        base_experience: baseExperience,
    } = summaryData;
    const name = removeDashAndCapitalise(rawName);
    const storedTeamIds = localStorage.getItem("team");
    const initialTeamIds: number[] = storedTeamIds
        ? parseLocalStorageString(storedTeamIds)
        : [];
    const [teamIds, setTeamIds] = useState<number[]>(initialTeamIds);

    function handleAddClick(id: number): void {
        const newTeamIds = [...teamIds, id];
        setTeamIds(newTeamIds);
        localStorage.setItem("team", JSON.stringify(newTeamIds));
        toast.dismiss();
        toast.success(`Registered ${name} to Pokedex`);
    }

    function handleRemoveClick(id: number): void {
        const newTeamIds = teamIds.filter((item) => item !== id);
        setTeamIds(newTeamIds);
        localStorage.setItem("team", JSON.stringify(newTeamIds));
        toast.dismiss();
        toast.success(`Removed ${name} from Pokedex`);
    }

    return (
        <div className="flex flex-col items-left">
            <h1 className="text-4xl font-bold">{name}</h1>
            <div className="flex flex-col sm:flex-row gap-8 my-4">
                <img
                    src={spriteUrl}
                    alt={name}
                    width={300}
                    height={300}
                    className="bg-slate-100 rounded-lg aspect-auto"
                />
                <div className="sm:mx-10">
                    <PokemonTypeCard types={types} />
                    <div className="flex gap-2 my-4 font-medium text-lg md:text-2xl text-nowrap">
                        <div className="flex flex-col text-right">
                            <p>Base Experience</p>
                            <p>Height</p>
                            <p>Weight</p>
                        </div>
                        <div className="flex flex-col">
                            <p>{baseExperience}</p>
                            <p>{height}</p>
                            <p>{weight}</p>
                        </div>
                    </div>
                    <div className="flex gap-2 text-lg font-bold">
                        {teamIds.includes(id) ? (
                            <button
                                className="border-1 border-black shadow-md bg-red-500 py-2 px-4 rounded-lg text-white hover:bg-red-600"
                                onClick={() => handleRemoveClick(id)}
                            >
                                Remove
                            </button>
                        ) : (
                            <button
                                className="border-1 border-black shadow-md bg-green-500 py-2 px-4 rounded-lg text-white hover:bg-green-600"
                                onClick={() => handleAddClick(id)}
                            >
                                Add
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default PokemonSummary;
