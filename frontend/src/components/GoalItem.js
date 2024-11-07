// src/components/GoalItem.js
import React from 'react';

const GoalItem = ({ goal, onUpdate, onDelete }) => {
    return (
        <div className={`p-4 mb-4 rounded shadow ${goal.completed ? 'bg-green-100' : 'bg-white'}`}>
            <h3 className="text-lg font-bold">{goal.title}</h3>
            <p className="text-sm">Priority: {goal.priority}</p>
            <div className="mt-2">
                <button
                    className="mr-2 p-2 bg-teal-500 text-white rounded hover:bg-teal-light"
                    onClick={() => onUpdate(goal._id)}>
                    Mark as {goal.completed ? 'Incomplete' : 'Complete'}
                </button>
                <button
                    className="p-2 bg-red-500 text-white rounded"
                    onClick={() => onDelete(goal._id)}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default GoalItem;
