import { useState } from 'react';
import { useAssignmentsContext } from '../hooks/useAssignmentsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const AssignmentForm = () => {
    const { dispatch } = useAssignmentsContext();
    const { user } = useAuthContext();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!user){
            setError('You must be logged in to create an assignment');
            return
        }

        if (!title || !description || !deadline) {
            setError('All fields are required');
            return;
        }

        const assignment = { title, description, completed: false, deadline };

        try {
            const response = await fetch('/api/assignments', { 
                method: 'POST',
                body: JSON.stringify(assignment),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            const json = await response.json();

            if (!response.ok) {
                // Set specific error messages based on response
                setError(json.message || 'Failed to create assignment');
            } else {
                setError(null);
                setTitle('');
                setDescription('');
                setDeadline('');
                dispatch({ type: 'CREATE_ASSIGNMENT', payload: json }); 
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Failed to submit the form');
        }
    };

    return (
        <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
            <h3 className="text-xl font-semibold mb-4">Add New Assignment</h3>

            <label className="block mb-2">Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="w-full p-2 border border-gray-300 rounded mb-4 bg-white"
                required
            />

            <label className="block mb-2">Description:</label>
            <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="w-full p-2 border border-gray-300 rounded mb-4 bg-white"
                required
            />

            <label className="block mb-2">Deadline:</label>
            <input
                type="datetime-local" 
                onChange={(e) => setDeadline(e.target.value)}
                value={deadline}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required
            />

            <button className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition duration-200">
                Add Assignment
            </button>
            {error && <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}
        </form>
    );
};

export default AssignmentForm;