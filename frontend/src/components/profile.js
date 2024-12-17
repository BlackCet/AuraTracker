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
        const response = await fetch("${process.env.REACT_APP_API_URL}/api/user/me", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        setProfileData(data);
        setNewUsername(data.username);
        setNewProfilePicture(
          data.profilePicture ||
            "https://tse3.mm.bing.net/th?id=OIP.7dTfyRneXPY5b7pj0NKuUgHaHa&pid=Api&P=0&h=180"
        );
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };

    if (user && !profileData) fetchProfileData();
  }, [user, profileData]);

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/update`, {
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

  // Calculate progress
const currentLevelXP = (profileData.level - 1) * 100 + (profileData.level - 2) * 50;
const nextLevelXP = profileData.level * 100 + (profileData.level - 1) * 50;
const xpProgress = ((profileData.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  return (
    <div className="max-w-lg mx-auto bg-white border border-gray-300 rounded-lg shadow-lg p-6 text-center">
      <h1 className="text-3xl font-semibold text-teal-dark mb-6">
        User Profile
      </h1>
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
        <h2 className="text-2xl font-semibold text-teal-600 mb-2">
          {profileData.username}
        </h2>
      )}
      <p className="text-gray-600 text-sm mb-4">{profileData.email}</p>
      <p className="text-gray-700 font-medium mb-6">
        Points: {profileData.points}
      </p>

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

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-teal-600 mb-4">Badges</h3>
        <div className="flex flex-wrap gap-6 justify-center">
          {profileData.badges && profileData.badges.length > 0 ? (
            profileData.badges.map((badge, index) => (
              <div key={index} className="text-center">
                {/* Medal Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-12 h-12 mb-2 mx-auto text-yellow-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 17l3 3m0 0l3-3m-3 3V7m0 0l-3 3-3-3m6 6L12 3 6 9"
                  />
                </svg>
                {/* Badge Name */}
                <p className="font-semibold">{badge}</p>
              </div>
            ))
          ) : (
            <p>No badges earned yet</p>
          )}
        </div>
      </div>
      <p className="text-gray-700 font-medium mb-6">XP: {profileData.xp}</p>
<p className="text-gray-700 font-medium mb-6">Level: {profileData.level}</p>
<div className="w-full bg-gray-200 rounded-full h-4 mb-4">
  <div
    className="bg-teal-600 h-4 rounded-full"
    style={{ width: `${xpProgress}%` }}
  ></div>
  <p>{profileData.xp} / {nextLevelXP} XP</p>
</div>

    </div>
  );
};

export default Profile;
