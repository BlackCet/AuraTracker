import React, { useState } from 'react';
import { useAssignmentsContext } from "../hooks/useAssignmentsContext";
import format from 'date-fns/format';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from '../hooks/useAuthContext';
import Notification from './Notification'; // Import Notification component

const AssignmentDetails = ({ assignment }) => {
    const { dispatch } = useAssignmentsContext();
    const { user } = useAuthContext();
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(assignment.title);
    const [description, setDescription] = useState(assignment.description);
    const [deadline, setDeadline] = useState(assignment.deadline ? format(new Date(assignment.deadline), 'yyyy-MM-dd\'T\'HH:mm') : '');
    const [notification, setNotification] = useState({ message: '', visible: false });

    const handleClick = async () => {
        if (!user) return;

        try {
            const response = await fetch(`/api/assignments/${assignment._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                }
            });

            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'DELETE_ASSIGNMENT', payload: json });
                setNotification({ message: 'Assignment deleted successfully!', visible: true });
            } else {
                console.error('Failed to delete the assignment:', json);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const toggleCompletion = async () => {
        if (!user) return;

        const updatedAssignment = { ...assignment, completed: !assignment.completed };

        try {
            const response = await fetch(`/api/assignments/${assignment._id}`, {
                method: 'PATCH',
                body: JSON.stringify(updatedAssignment),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'UPDATE_ASSIGNMENT', payload: json });

                // Fetch updated user data
                const userResponse = await fetch('/api/user/me', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                    },
                });
                const userData = await userResponse.json();

                // Display the notification with the updated points and badges
                if (userResponse.ok) {
                    let message = updatedAssignment.completed 
                        ? `Bravo! 🎉 +10 points added to your score. Your current points: ${userData.points}`
                        : `Assignment marked as incomplete. Points removed. Current points: ${userData.points}`;

                    if (userData.badges.includes("Assignment Novice")) {
                        message += " You've earned the Assignment Novice badge!";
                    }
                    if (userData.badges.includes("Deadline Pro")) {
                        message += " You've earned the Deadline Pro badge!";
                    }

                    setNotification({ message, visible: true });
                } else {
                    console.error('Failed to fetch user data:', userData);
                }
            } else {
                console.error('Failed to update the assignment:', json);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!user) return;

        const updatedAssignment = { title, description, deadline, completed: assignment.completed };

        try {
            const response = await fetch(`/api/assignments/${assignment._id}`, {
                method: 'PATCH',
                body: JSON.stringify(updatedAssignment),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'UPDATE_ASSIGNMENT', payload: json });
                setIsEditing(false);
            } else {
                console.error('Failed to update the assignment:', json);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const handleCloseNotification = () => {
        setNotification({ ...notification, visible: false });
    };

    const createdAt = formatDistanceToNow(new Date(assignment.createdAt), { addSuffix: true });

    return (
        <div className="bg-white rounded shadow-md p-4 relative mb-4">
            {isEditing ? (
                <form onSubmit={handleUpdate}>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-4 bg-gray-100"
                        required
                    />
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-4 bg-gray-100"
                        required
                    />
                    <label>Deadline:</label>
                    <input
                        type="datetime-local"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-4 bg-gray-100"
                    />
                    <button type="submit" className="bg-teal-500 text-white py-1 px-4 rounded mr-2">Save</button>
                    <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 text-white py-1 px-4 rounded">Cancel</button>
                </form>
            ) : (
                <>
                    <h4 className="text-lg font-semibold text-teal-500">{assignment.title}</h4>
                    <p><strong>Description: </strong>{assignment.description}</p>
                    <p><strong>Status: </strong>{assignment.completed ? "Completed" : "Incomplete"}</p>
                    <label className="block mb-2">
                        <input
                            type="checkbox"
                            checked={assignment.completed}
                            onChange={toggleCompletion}
                        />
                        {assignment.completed ? ' Complete' : ' Incomplete'}
                    </label>
                    {assignment.deadline && (
                        <p><strong>Due Date: </strong>{format(new Date(assignment.deadline), 'MMMM d, yyyy HH:mm')}</p>
                    )}
                    <p className="text-gray-500">Added {createdAt}</p>
                    <button onClick={() => setIsEditing(true)} className="my-1 bg-teal-500 hover:bg-teal-600 text-white py-1 px-4 rounded mr-2">Update</button>
                    <span className="material-symbols-outlined cursor-pointer absolute top-4 right-4 hover:text-red-500" onClick={handleClick}>delete</span>
                </>
            )}
            {notification.visible && (
                <Notification message={notification.message} onClose={handleCloseNotification} />
            )}
        </div>
    );
};

export default AssignmentDetails;
