// src/components/GoalList.js
import React, { useState } from 'react';
import GoalItem from './GoalItem';
import { useGoalsContext } from '../hooks/useGoalsContext';

const GoalList = ({ onUpdate, onDelete }) => {
    const { goals } = useGoalsContext();
    const [priorityFilter, setPriorityFilter] = useState('All');

    const handleFilterChange = (newFilter) => {
        setPriorityFilter(newFilter);
    };

    // Filter goals based on priority
    const filteredGoals = goals.filter(goal => 
        priorityFilter === 'All' || goal.priority === priorityFilter
    );

    return (
        <div>
            <div className="mb-4 flex gap-2">
                <button 
                    onClick={() => handleFilterChange('All')}
                    className={`px-4 py-2 rounded ${priorityFilter === 'All' ? 'bg-teal-500 text-white' : 'bg-gray-200'}`}>
                    All
                </button>
                <button 
                    onClick={() => handleFilterChange('Low')}
                    className={`px-4 py-2 rounded ${priorityFilter === 'Low' ? 'bg-teal-500 text-white' : 'bg-gray-200'}`}>
                    Low
                </button>
                <button 
                    onClick={() => handleFilterChange('Medium')}
                    className={`px-4 py-2 rounded ${priorityFilter === 'Medium' ? 'bg-teal-500 text-white' : 'bg-gray-200'}`}>
                    Medium
                </button>
                <button 
                    onClick={() => handleFilterChange('High')}
                    className={`px-4 py-2 rounded ${priorityFilter === 'High' ? 'bg-teal-500 text-white' : 'bg-gray-200'}`}>
                    High
                </button>
            </div>
            
            <div className="space-y-4">
                {filteredGoals.length > 0 ? (
                    filteredGoals.map(goal => (
                        <GoalItem key={goal._id} goal={goal} onUpdate={onUpdate} onDelete={onDelete} />
                    ))
                ) : (
                    <p>No goals match the selected priority.</p>
                )}
            </div>
        </div>
    );
};

export default GoalList;
