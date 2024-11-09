import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Profile = () => {
    const { user } = useAuthContext();
    const [profileData, setProfileData] = useState(null);
    const [newUsername, setNewUsername] = useState("");
    const [newProfilePicture, setNewProfilePicture] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch("/api/user/me", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                const data = await response.json();
                setProfileData(data);
                setNewUsername(data.username);
                setNewProfilePicture(
                    data.profilePicture || "https://tse3.mm.bing.net/th?id=OIP.7dTfyRneXPY5b7pj0NKuUgHaHa&pid=Api&P=0&h=180"
                );
            } catch (error) {
                console.error("Failed to fetch profile data:", error);
            }
        };

        if (user && !profileData) fetchProfileData();
    }, [user, profileData]);

    const handleUpdateProfile = async () => {
        try {
            const response = await fetch("/api/user/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    username: newUsername,
                    profilePicture: newProfilePicture,
                }),
            });

            if (response.ok) {
                const updatedData = await response.json();
                setProfileData(updatedData);
                setIsEditing(false);
            } else {
                console.error("Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-lg mx-auto bg-white border border-gray-300 rounded-lg shadow-lg p-6 text-center">
            <h1 className="text-3xl font-semibold text-teal-dark mb-6">User Profile</h1>
            <img
                src={`${newProfilePicture}?${Date.now()}`}
                alt="Profile"
                className="w-28 h-28 rounded-full mx-auto mb-4 shadow-md"
            />
            {isEditing ? (
                <input
                    type="text"
                    className="block w-full mt-2 mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
                    value={newProfilePicture}
                    onChange={(e) => setNewProfilePicture(e.target.value)}
                    placeholder="Profile picture URL"
                />
            ) : (
                <button
                    className="text-sm text-teal-600 hover:text-teal-800 font-semibold bg-teal-100 hover:bg-teal-200 rounded-lg px-4 py-2 mb-4 transition-colors duration-200"
                    onClick={() => setIsEditing(true)}
                >
                    Update 
                </button>
            )}
            {isEditing ? (
                <input
                    type="text"
                    className="block w-full mt-2 mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="Username"
                />
            ) : (
                <h2 className="text-2xl font-semibold text-teal-600 mb-2">{profileData.username}</h2>
            )}
            <p className="text-gray-600 text-sm mb-4">{profileData.email}</p>
            <p className="text-gray-700 font-medium mb-6">Points: {profileData.points}</p>

            {isEditing && (
                <div className="flex justify-center gap-4 mt-6">
                    <button
                        className="px-5 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition"
                        onClick={handleUpdateProfile}
                    >
                        Save Changes
                    </button>
                    <button
                        className="px-5 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
                        onClick={() => setIsEditing(false)}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;
