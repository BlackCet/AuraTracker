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

        if(!user){
            setError('You must be logged in to add a course')
            return 
        }

        if (!name || !units || !creditScore) {
            setError('All fields are required');
            return;
        }

        const course = { name, units, creditScore };

        try {
            const response = await fetch('/api/course', {
                method: 'POST',
                body: JSON.stringify(course),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error || 'Unknown error');
            } else {
                setError(null);
                setName('');
                setUnits('');
                setCreditScore('');
                dispatch({ type: 'CREATE_COURSE', payload: json });
            }
        } catch (err) {
            setError('Failed to submit the form');
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Course</h3>

            <label>Course Name:</label>
            <input className='bg-white'
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />

            <label>Units:</label>
            <input className='bg-white'
                type="number"
                onChange={(e) => setUnits(e.target.value)}
                value={units}
            />

            <label>Credits:</label>
            <input className='bg-white'
                type="number"
                onChange={(e) => setCreditScore(e.target.value)}
                value={creditScore}
            />

            <button>Add Course</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default CourseForm;