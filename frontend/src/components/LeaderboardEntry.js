// LeaderboardEntry.js
import { useAuthContext } from "../hooks/useAuthContext";

const LeaderboardEntry = ({ entry, rank }) => {
    const { user } = useAuthContext();

    return (
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 transition-transform transform hover:scale-105 flex justify-between items-center">
            <div className="flex items-center">
                <span className="text-lg font-bold mr-4 text-teal-700">{rank}.</span>
                <span className="text-xl font-semibold">{entry.username}</span>
            </div>
            <div className="flex items-center space-x-4">
                <span className="text-teal-600 font-medium">{entry.points} points</span>
                {user && user.username === entry.username && (
                    <span className="text-sm text-gray-500 italic">(You)</span>
                )}
            </div>
        </div>
    );
};

export default LeaderboardEntry;
