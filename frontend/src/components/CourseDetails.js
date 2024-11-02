import { useCoursesContext } from "../hooks/useCoursesContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from "../hooks/useAuthContext";

const CourseDetails = ({ course }) => {
    const { dispatch } = useCoursesContext();
    const { user } = useAuthContext();

    const handleClick = async () => {
        if (!user) {
            alert('You must be logged in to delete a course.');
            return;
        }

        try {
            const response = await fetch('/api/course/' + course._id, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'DELETE_COURSE', payload: json });
            } else {
                alert(`Failed to delete the course: ${json.error || 'Unknown error'}`);
            }
        } catch (error) {
            alert('An error occurred while trying to delete the course. Please try again later.');
            console.error('An error occurred:', error);
        }
    };

    return (
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 transition-transform transform hover:scale-105">
            <h4 className="text-teal-dark text-lg font-semibold">{course.name}</h4>
            <p><strong>No of units:</strong> {course.units}</p>
            <p><strong>Course credits:</strong> {course.creditScore}</p>
            <p className="text-gray-500">{formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}</p>
            <span 
                className="material-symbols-outlined cursor-pointer text-red-500 hover:text-red-700" 
                onClick={handleClick}
            >
                delete
            </span>
        </div>
    );
};

export default CourseDetails;
