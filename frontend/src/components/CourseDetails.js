import { useCoursesContext } from "../hooks/useCoursesContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const CourseDetails = ({ course }) => {
    const { dispatch } = useCoursesContext();

    const handleClick = async () => {
        try {
            const response = await fetch('/api/course/' + course._id, {
                method: 'DELETE'
            });

            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'DELETE_COURSE', payload: json });
            } else {
                console.error('Failed to delete the course:', json);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <div className="course-details">
            <h4>{course.name}</h4>
            <p><strong>No of units: </strong>{course.units}</p>
            <p><strong>course credits: </strong>{course.creditScore}</p>
            <p>{formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    );
};

export default CourseDetails;