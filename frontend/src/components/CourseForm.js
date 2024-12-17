import { useState } from 'react';
import { useCoursesContext } from '../hooks/useCoursesContext';
import { useAuthContext } from '../hooks/useAuthContext';

const CourseForm = () => {
    const { dispatch } = useCoursesContext();
    const { user } = useAuthContext();

    const [name, setName] = useState('');
    const [units, setUnits] = useState('');
    const [creditScore, setCreditScore] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in to add a course');
            return;
        }

        if (!name || !units || !creditScore) {
            setError('All fields are required');
            return;
        }

        const course = { name, units, creditScore };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/course`, {
                method: 'POST',
                body: JSON.stringify(course),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error || 'Failed to create the course. Please check your inputs.');
            } else {
                setError(null);
                setName('');
                setUnits('');
                setCreditScore('');
                dispatch({ type: 'CREATE_COURSE', payload: json });
            }
        } catch (err) {
            setError('Failed to submit the form. Please try again later.');
            console.error('An error occurred:', err);
        }
    };

    return (
        <form className="bg-white shadow-md rounded p-6 mt-6" onSubmit={handleSubmit}>
            <h3 className="text-teal-dark text-xl font-bold">Add a New Course</h3>

            <label className="block mt-4">Course Name:</label>
            <input 
                className="bg-gray-200 border border-gray-300 rounded w-full p-2"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />

            <label className="block mt-4">Units:</label>
            <input 
                className="bg-gray-200 border border-gray-300 rounded w-full p-2"
                type="number"
                onChange={(e) => setUnits(e.target.value)}
                value={units}
            />

            <label className="block mt-4">Credits:</label>
            <input 
                className="bg-gray-200 border border-gray-300 rounded w-full p-2"
                type="number"
                onChange={(e) => setCreditScore(e.target.value)}
                value={creditScore}
            />

            <button className="bg-teal-dark text-white py-2 px-4 rounded mt-4 hover:bg-teal-light">Add Course</button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
        </form>
    );
};

export default CourseForm;
