import { removeDashAndCapitalise } from "~/utils/utils";

interface MoveCardProps {
    moveName: string;
    moveLevel: number;
}

const MoveCard: React.FC<MoveCardProps> = ({ moveName, moveLevel }) => {
    return (
        <div className="border-2 border-black rounded-lg p-4 w-2/3">
            <div>{removeDashAndCapitalise(moveName)}</div>
            <div>{moveLevel}</div>
        </div>
    );
};

export default MoveCard;
