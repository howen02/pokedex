import React from "react";

interface StatbarProps {
    statName: string;
    statValue: number;
}

const Statbar: React.FC<StatbarProps> = ({ statName, statValue }) => {
    return (
        <div className="flex gap-2 items-center whitespace-nowrap text-right">
            <div className="w-40">{statName}</div>
            <div>{statValue}</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${(statValue / 255) * 100}%` }}
                />
            </div>
        </div>
    );
};

export default Statbar;
