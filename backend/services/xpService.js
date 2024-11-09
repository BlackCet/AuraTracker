// services/xpService.js
const User = require("../models/userModel");

const awardXP = async (userId, xpEarned) => {
  try {
    const user = await User.findById(userId);
    if (!user) return;

    // Update XP
    user.xp += xpEarned;

    // Calculate the level based on the new XP
    const calculateLevel = (xp) => {
      let level = 1;
      let xpThreshold = 100;

      while (xp >= xpThreshold) {
        level += 1;
        xpThreshold += (level * 100 + (level - 1) * 50);
      }

      return level;
    };

    const newLevel = calculateLevel(user.xp);
    
    if (newLevel > user.level) {
      user.level = newLevel;
      // Optionally, add a notification system to alert the user about leveling up
    }

    await user.save();
    return { xp: user.xp, level: user.level };
  } catch (error) {
    console.error("Error awarding XP:", error);
  }
};

module.exports = { awardXP };
