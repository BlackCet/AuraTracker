import React, { createContext, useReducer } from 'react';

export const GoalsContext = createContext();

const goalsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_GOALS':
            return { goals: action.payload };
        case 'CREATE_GOAL':
            return { goals: [action.payload, ...state.goals] };
        case 'DELETE_GOAL':
            return { goals: state.goals.filter(goal => goal._id !== action.payload._id) };
        case 'UPDATE_GOAL':
            return {
                goals: state.goals.map(goal =>
                    goal._id === action.payload._id ? action.payload : goal
                ),
            };
        default:
            return state;
    }
};

export const GoalsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(goalsReducer, { goals: [] });

    return (
        <GoalsContext.Provider value={{ goals: state.goals, dispatch }}>
            {children}
        </GoalsContext.Provider>
    );
};
