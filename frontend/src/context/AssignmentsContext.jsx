import React, { createContext, useReducer } from 'react';

export const AssignmentsContext = createContext();

const assignmentsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ASSIGNMENTS':
            return { assignments: action.payload };
        case 'CREATE_ASSIGNMENT':
            return { assignments: [action.payload, ...state.assignments] };
        case 'DELETE_ASSIGNMENT':
            return { assignments: state.assignments.filter(assignment => assignment._id !== action.payload._id) };
        case 'UPDATE_ASSIGNMENT':
            return {
                assignments: state.assignments.map(assignment =>
                    assignment._id === action.payload._id ? action.payload : assignment
                ),
            };
        default:
            return state;
    }
};

export const AssignmentsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(assignmentsReducer, { assignments: [] });

    return (
        <AssignmentsContext.Provider value={{ assignments: state.assignments, dispatch }}>
            {children}
        </AssignmentsContext.Provider>
    );
};
