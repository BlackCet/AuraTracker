// src/components/Assignments.jsx
import { useEffect } from "react";
import { useAssignmentsContext } from "../hooks/useAssignmentsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import AssignmentList from '../components/AssignmentList'; 
import AssignmentForm from '../components/AssignmentForm'; 

const Assignments = () => { 
    const { dispatch } = useAssignmentsContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchAssignments = async () => { 
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/assignments`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                } 
            }); 
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_ASSIGNMENTS', payload: json }); 
            }
        };

        if(user){
            fetchAssignments();
        }

    }, [dispatch, user]);

    return (
        <div className="bg-light-gray min-h-auto flex items-center justify-center">
            <div id="Assignments" className="max-w-7xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Assignment List Section */}
                    <AssignmentList />

                    {/* Assignment Form Section */}
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <AssignmentForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Assignments;