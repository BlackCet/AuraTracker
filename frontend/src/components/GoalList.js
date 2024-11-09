// src/components/GoalList.js
import React from 'react';
import GoalItem from './GoalItem';
import { useGoalsContext } from '../hooks/useGoalsContext';

const GoalList = ({ onUpdate, onDelete }) => {
    const { goals } = useGoalsContext();
    
    return (
        <div className="space-y-4">
            {goals && goals.map(goal => (
                <GoalItem key={goal._id} goal={goal} onUpdate={onUpdate} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default GoalList;
