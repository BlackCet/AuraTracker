import React, { useState, useEffect } from 'react';
import GoalList from '../components/GoalList';
import AddGoalForm from '../components/GoalForm';

const Goals = () => {
    const [goals, setGoals] = useState([]);

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

    return (
        <div className="app p-4 flex justify-between space-x-4">
            <div className="w-1/3">
                <h1 className="text-2xl font-bold mb-4">Academic Goals</h1>
                <AddGoalForm onAdd={addGoal} />
            </div>
            <div className="w-2/3 p-12">
                <GoalList goals={goals} onUpdate={updateGoal} onDelete={deleteGoal} />
            </div>
        </div>
    );
};

export default Goals;
