// src/components/AddGoalForm.js
import React, { useState } from 'react';

const AddGoalForm = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('Medium');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({ title, priority, completed: false });
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 space-y-2">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="New Goal"
                required
                className="p-2 border rounded w-full bg-white"
            />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="p-2 border rounded w-full bg-white">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <button type="submit" className="p-2 bg-teal-500text-white rounded w-full hover:bg-teal-light">Add Goal</button>
        </form>
    );
};

export default AddGoalForm;
