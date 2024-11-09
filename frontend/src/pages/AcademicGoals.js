import React, { useState, useEffect } from 'react';
import GoalList from '../components/GoalList';
import AddGoalForm from '../components/GoalForm';
import { useAuthContext } from '../hooks/useAuthContext';
import { useGoalsContext } from '../hooks/useGoalsContext';

const AcademicGoals = () => {
    const [goals, setGoals] = useState([]);
    const [filter] = useState('All'); // Add state for the filter
    const { user } = useAuthContext(); // Access the user from auth context
    const { dispatch } = useGoalsContext(); // Access the dispatch function from GoalsContext

    useEffect(() => {
        const fetchGoals = async () => { 
            const response = await fetch('/api/goals', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                } 
            }); 
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_GOALS', payload: json }); 
            }
        };

        if(user){
            fetchGoals();
        }

    }, [dispatch, user]); // Remove fetchGoals from the dependency array to resolve the warning


    const addGoal = async (goal) => {
        try {
            const response = await fetch('/api/goals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(goal),
            });
            const newGoal = await response.json();
            if (response.ok) {
                setGoals([...goals, newGoal]);
            }
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
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(updatedGoal),
            });
            const newGoal = await response.json();
            if (response.ok) {
                setGoals(goals.map(g => (g._id === id ? newGoal : g)));
            }
        } catch (error) {
            console.error('Error updating goal:', error);
        }
    };

    const deleteGoal = async (id) => {
        try {
            const response = await fetch(`/api/goals/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            if (response.ok) {
                setGoals(goals.filter(g => g._id !== id));
            }
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

export default AcademicGoals;
