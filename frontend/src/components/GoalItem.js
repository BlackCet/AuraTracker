// src/components/GoalItem.js
import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useGoalsContext } from '../hooks/useGoalsContext'; // Import GoalsContext
import Notification from './Notification';

const GoalItem = ({ goal }) => {
    const { user } = useAuthContext();
    const { dispatch } = useGoalsContext(); // Access dispatch from GoalsContext
    const [notification, setNotification] = useState({ message: '', visible: false });
    const [badgeNotification, setBadgeNotification] = useState({ message: '', visible: false });

    const handleToggleCompletion = async () => {
        if (!user) return;

        const updatedGoal = { ...goal, completed: !goal.completed };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/goals/${goal._id}`, {
                method: 'PATCH',
                body: JSON.stringify(updatedGoal),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'UPDATE_GOAL', payload: json }); // Dispatch the updated goal to GoalsContext

                const userResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/user/me`, {
                    headers: { 'Authorization': `Bearer ${user.token}` },
                });
                const userData = await userResponse.json();

                if (userResponse.ok) {
                    let newBadge = null;
                    if (updatedGoal.completed && !goal.completed) {
                        const completedCount = userData.goalsCompleted || 0;

                        if (completedCount === 5) newBadge = "Goal Setter";
                        else if (completedCount === 10) newBadge = "Goal Achiever";
                        // Additional badges based on completedCount can be added here
                    }

                    setNotification({
                        message: updatedGoal.completed
                            ? `Great! 🎉 +5 points for completing a goal. Your current points: ${userData.points}`
                            : `Goal marked as incomplete. Points deducted. Current points: ${userData.points}`,
                        visible: true,
                    });

                    if (newBadge) {
                        setBadgeNotification({
                            message: `Congratulations! You've earned a new badge: ${newBadge}!`,
                            visible: true,
                        });
                    }
                } else {
                    console.error('Failed to fetch user data:', userData);
                }
            } else {
                console.error('Failed to update goal:', json);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const handleDelete = async () => {
        if (!user) return;

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/goals/${goal._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'DELETE_GOAL', payload: json }); // Dispatch to delete goal from global state
            } else {
                console.error('Failed to delete goal:', json);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const handleCloseNotification = () => {
        setNotification({ ...notification, visible: false });
    };

    const handleCloseBadgeNotification = () => {
        setBadgeNotification({ ...badgeNotification, visible: false });
    };

    return (
        <div className={`p-4 mb-4 rounded shadow ${goal.completed ? 'bg-green-100' : 'bg-white'}`}>
            <h3 className="text-lg font-bold">{goal.title}</h3>
            <p className="text-sm">Priority: {goal.priority}</p>
            <div className="mt-2">
                <button
                    className="mr-2 p-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                    onClick={handleToggleCompletion}>
                    Mark as {goal.completed ? 'Incomplete' : 'Complete'}
                </button>
                <button
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={handleDelete}>
                    Delete
                </button>
            </div>
            {notification.visible && (
                <Notification message={notification.message} onClose={handleCloseNotification} />
            )}
            {badgeNotification.visible && (
                <Notification message={badgeNotification.message} onClose={handleCloseBadgeNotification} />
            )}
        </div>
    );
};

export default GoalItem;
