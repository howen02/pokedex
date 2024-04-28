import React from "react";
import { removeDashAndCapitalise } from "~/utils/utils";

interface StatbarProps {
    statName: string;
    statValue: number;
}

const Statbar: React.FC<StatbarProps> = ({ statName, statValue }) => {
    return (
        <div className="flex gap-2 items-center whitespace-nowrap text-right text-lg font-medium">
            <div className="w-40">{removeDashAndCapitalise(statName)}</div>
            <div>{statValue}</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                    className="bg-white h-2.5 rounded-full"
                    style={{ width: `${(statValue / 255) * 100}%` }}
                />
            </div>
        </div>
    );
};

export default Statbar;
