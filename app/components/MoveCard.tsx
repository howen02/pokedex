import { removeDashAndCapitalise } from "~/utils/utils";

interface MoveCardProps {
    moveName: string;
    moveLevel: number;
}

const MoveCard: React.FC<MoveCardProps> = ({ moveName, moveLevel }) => {
    return (
        <div className="border-4 border-black rounded-lg p-6 hover:scale-105">
            <div className="font-semibold text-lg">{removeDashAndCapitalise(moveName)}</div>
            <div>Level {moveLevel}</div>
        </div>
    );
};

export default MoveCard;
