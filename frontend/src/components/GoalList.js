// src/components/GoalList.js
import React from 'react';
import GoalItem from './GoalItem';

const GoalList = ({ goals, onUpdate, onDelete }) => {
    return (
        <div className="space-y-4">
            {goals.map(goal => (
                <GoalItem key={goal._id} goal={goal} onUpdate={onUpdate} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default GoalList;
