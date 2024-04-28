import { removeDashAndCapitalise } from "~/utils/utils";

interface MoveCardProps {
    moveName: string;
    moveLevel: number;
}

const MoveCard: React.FC<MoveCardProps> = ({ moveName, moveLevel }) => {
    return (
        <div className="bg-yellow-500 text-slate-100 rounded-lg p-6 hover:scale-105">
            <div className="font-semibold text-xl">{removeDashAndCapitalise(moveName)}</div>
            <div className="italic">Level {moveLevel}</div>
        </div>
    );
};

export default MoveCard;
