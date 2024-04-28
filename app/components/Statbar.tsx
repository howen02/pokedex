import React from "react";
import { removeDashAndCapitalise } from "~/utils/utils";

interface StatbarProps {
    statName: string;
    statValue: number;
}

const Statbar: React.FC<StatbarProps> = ({ statName, statValue }) => {
    return (
        <div className="flex items-center text-nowrap text-slate-100 text-lg gap-4 py-2">
            <span className="font-semibold w-32 text-right">
                {removeDashAndCapitalise(statName)}
            </span>
            <span className="w-6 font-semibold">{statValue}</span>
            <div className="flex-grow rounded-full h-2.5 bg-slate-100">
                <div
                    className="bg-yellow-400 h-2.5 rounded-full"
                    style={{ width: `${(statValue / 255) * 100}%` }}
                />
            </div>
        </div>
    );
};

export default Statbar;
