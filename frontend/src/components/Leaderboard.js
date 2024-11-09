import { useState, useEffect } from "react";
import LeaderboardEntry from "./LeaderboardEntry";

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch leaderboard data
    const fetchLeaderboard = async () => {
        try {
            const response = await fetch("/leaderboard");
            const data = await response.json();
            setLeaderboard(data);
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaderboard(); // Initial fetch
        
        // Set interval to fetch data every 5 seconds
        const interval = setInterval(fetchLeaderboard, 5000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    if (loading) {
        return <div>Loading leaderboard...</div>;
    }

    return (
        <div>
            {leaderboard.length === 0 ? (
                <div>No leaderboard entries available.</div>
            ) : (
                leaderboard.map((entry, index) => (
                    <LeaderboardEntry key={entry._id} entry={entry} rank={index + 1} />
                ))
            )}
        </div>
    );
};

export default Leaderboard;
