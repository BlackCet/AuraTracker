// src/components/AssignmentList.jsx
import React from 'react';
import { useAssignmentsContext } from "../hooks/useAssignmentsContext";
import AssignmentDetails from './AssignmentDetails';

const AssignmentList = () => {
    const { assignments } = useAssignmentsContext();

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Assignment Details</h2>
            {assignments.length > 0 ? (
                assignments.map(assignment => (
                    <AssignmentDetails key={assignment._id} assignment={assignment} />
                ))
            ) : (
                <p>No assignments available.</p>
            )}
        </div>
    );
};

export default AssignmentList;
