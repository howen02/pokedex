import React, { useState } from "react";
import PokemonTypeCard from "./PokemonTypeCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PokemonSummaryProps {
    name: string;
    id: number;
    types: any[];
    baseExperience: number;
    height: number;
    weight: number;
    spriteUrl: string;
}

const PokemonSummary: React.FC<PokemonSummaryProps> = ({
    name,
    id,
    types,
    baseExperience,
    height,
    weight,
    spriteUrl,
}) => {
    const storedTeamIds = localStorage.getItem("team");
    const initialTeamIds: number[] = storedTeamIds
        ? storedTeamIds
              .split(",")
              .map((idString) => parseInt(idString.trim(), 10))
        : [];
    const [teamIds, setTeamIds] = useState<number[]>(initialTeamIds);

    function handleAddClick(id: number): void {
        if (teamIds.includes(id)) {
            toast.dismiss();
            toast.error(`${name} already registered in Pokedex`);
            return;
        }

        const newTeamIds = [...teamIds, id];
        setTeamIds(newTeamIds);
        localStorage.setItem("team", JSON.stringify(newTeamIds));
        toast.dismiss();
        toast.success(`Added ${name} to Pokedex`);
    }

    function handleRemoveClick(id: number): void {
        if (!teamIds.includes(id)) {
            toast.dismiss();
            toast.error(`${name} not registered in Pokedex`);
            return;
        }

        const newTeamIds = teamIds.filter((item) => item !== id);
        setTeamIds(newTeamIds);
        localStorage.setItem("team", JSON.stringify(newTeamIds));
        toast.dismiss();
        toast.success(`Removed ${name} from Pokedex`);
    }

    return (
        <div className="flex flex-col items-left">
            <h1 className="text-4xl font-bold">{name}</h1>
            <div className="flex gap-8 text-xl font-semibold my-4">
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
                    <div className="flex gap-2 pt-2">
                        <button
                            className="border-1 border-black shadow-md bg-green-500 py-2 px-4 rounded-lg text-white"
                            onClick={() => handleAddClick(id)}
                        >
                            Add
                        </button>
                        <button
                            className="border-1 border-black shadow-md bg-red-500 py-2 px-4 rounded-lg text-white"
                            onClick={() => handleRemoveClick(id)}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default PokemonSummary;
