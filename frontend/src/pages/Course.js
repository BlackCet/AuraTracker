import { useEffect } from "react";
import { useCoursesContext } from "../hooks/useCoursesContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import CourseDetails from "../components/CourseDetails";
import CourseForm from "../components/CourseForm";

const Course = () => {
    const { courses, dispatch } = useCoursesContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/course`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                const json = await response.json();

                if (response.ok) {
                    dispatch({ type: 'SET_COURSES', payload: json });
                } else {
                    alert(`Failed to fetch courses: ${json.error || 'Unknown error'}`);
                }
            } catch (error) {
                alert('An error occurred while fetching courses. Please try again later.');
                console.error('An error occurred:', error);
            }
        }

        if (user) {
            fetchCourses();
        }

    }, [dispatch, user]);

    return (
        <div className="max-w-6xl mx-auto p-4 flex flex-col md:flex-row">
            <div className="flex-1 md:mr-4">
                <h2 className="text-teal-dark text-2xl font-bold mb-4">Course List</h2>
                <div className="grid grid-cols-1 gap-6">
                    {courses && courses.map(course => (
                        <CourseDetails course={course} key={course._id} />
                    ))}
                </div>
            </div>
            <div className="flex-1 md:ml-4 mt-6 md:mt-0">
                <CourseForm />
            </div>
        </div>
    );
};

export default Course;
