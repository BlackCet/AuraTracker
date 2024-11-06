import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import LeaderboardEntry from "../components/LeaderboardEntry";

const Leaderboard = () => {
    const { user } = useAuthContext();
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await fetch('/api/user/leaderboard', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                const json = await response.json();

                if (response.ok) {
                    setLeaderboard(json);
                } else {
                    alert(`Failed to fetch leaderboard: ${json.error || 'Unknown error'}`);
                }
            } catch (error) {
                alert('An error occurred while fetching leaderboard. Please try again later.');
                console.error('An error occurred:', error);
            }
        };

        if (user) {
            fetchLeaderboard();
        }

    }, [user]);

    return (
        <div className="max-w-6xl mx-auto p-4 flex flex-col">
            <h2 className="text-teal-dark text-2xl font-bold mb-4">Leaderboard</h2>
            <div className="grid grid-cols-1 gap-4">
                {leaderboard && leaderboard.map((entry, index) => (
                    <LeaderboardEntry entry={entry} rank={index + 1} key={entry._id} />
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;
