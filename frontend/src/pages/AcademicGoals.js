import React, { useState, useEffect } from 'react';
import GoalList from '../components/GoalList';
import AddGoalForm from '../components/GoalForm';

const Goals = () => {
    const [goals, setGoals] = useState([]);
    const [filter, setFilter] = useState('All'); // Add state for the filter

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            const response = await fetch('/api/goals');
            const data = await response.json();
            setGoals(data);
        } catch (error) {
            console.error('Error fetching goals:', error);
        }
    };

    const addGoal = async (goal) => {
        try {
            const response = await fetch('/api/goals', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(goal),
            });
            const newGoal = await response.json();
            setGoals([...goals, newGoal]);
        } catch (error) {
            console.error('Error adding goal:', error);
        }
    };

    const updateGoal = async (id) => {
        try {
            const goal = goals.find(g => g._id === id);
            const updatedGoal = { ...goal, completed: !goal.completed };
            const response = await fetch(`/api/goals/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedGoal),
            });
            const newGoal = await response.json();
            setGoals(goals.map(g => (g._id === id ? newGoal : g)));
        } catch (error) {
            console.error('Error updating goal:', error);
        }
    };

    const deleteGoal = async (id) => {
        try {
            await fetch(`/api/goals/${id}`, {
                method: 'DELETE',
            });
            setGoals(goals.filter(g => g._id !== id));
        } catch (error) {
            console.error('Error deleting goal:', error);
        }
    };

    const filterGoals = () => {
        if (filter === 'All') {
            return goals;
        }
        return goals.filter(goal => goal.priority === filter);
    };

    return (
        <div className="app p-4 flex flex-col">
            <div className="flex justify-center mt-4">
                <button
                    className={`p-2 mx-2 ${filter === 'All' ? 'bg-teal-500 text-white hover:bg-teal-light' : 'bg-gray-200 hover:bg-teal-light'}`}
                    onClick={() => setFilter('All')}
                >
                    All
                </button>
                <button
                    className={`p-2 mx-2 ${filter === 'Low' ? 'bg-teal-500 text-white hover:bg-teal-light' : 'bg-gray-200 hover:bg-teal-light '}`}
                    onClick={() => setFilter('Low')}
                >
                    Low
                </button>
                <button
                    className={`p-2 mx-2 ${filter === 'Medium' ? 'bg-teal-500 text-white hover:bg-teal-light' : 'bg-gray-200 hover:bg-teal-light'}`}
                    onClick={() => setFilter('Medium')}
                >
                    Medium
                </button>
                <button
                    className={`p-2 mx-2 ${filter === 'High' ? 'bg-teal-500 text-white hover:bg-teal-light' : 'bg-gray-200 hover:bg-teal-light'}`}
                    onClick={() => setFilter('High')}
                >
                    High
                </button>
            </div>
            <div className="flex justify-between mb-4">
                <div className="w-1/3 mr-4">
                    <h1 className="text-2xl font-bold mb-4">Academic Goals</h1>
                    <AddGoalForm onAdd={addGoal} />
                </div>
                <div className="w-2/3 mt-12">
                    <GoalList goals={filterGoals()} onUpdate={updateGoal} onDelete={deleteGoal} />
                </div>
            </div>
        </div>
    );
};

export default Goals;
