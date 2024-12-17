import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useGoalsContext } from '../hooks/useGoalsContext'; // Import the GoalsContext hook

const AddGoalForm = () => {
    const { user } = useAuthContext();
    const { dispatch } = useGoalsContext(); // Access dispatch from GoalsContext
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in to add a goal');
            return;
        }

        if (!title) {
            setError('Goal title is required');
            return;
        }

        const goal = { title, priority, completed: false };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/goals`, {
                method: 'POST',
                body: JSON.stringify(goal),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.message || 'Failed to add goal');
            } else {
                setError(null);
                setTitle('');
                setPriority('Medium');
                dispatch({ type: 'CREATE_GOAL', payload: json }); // Dispatch the new goal to GoalsContext
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Failed to submit the form');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
            <h3 className="text-teal-dark text-xl font-bold mb-4">Add New Goal</h3>

            <label className="block mb-2">Title:</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="New Goal"
                required
                className="w-full p-2 border border-gray-300 rounded mb-4 bg-white"
            />

            <label className="block mb-2">Priority:</label>
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4 bg-white"
            >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <button
                type="submit"
                className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition duration-200"
            >
                Add Goal
            </button>

            {error && (
                <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}
        </form>
    );
};

export default AddGoalForm;
