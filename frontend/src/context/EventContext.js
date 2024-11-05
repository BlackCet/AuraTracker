// EventContext.js
import { createContext, useReducer } from 'react';

export const EventContext = createContext();

export const eventReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EVENTS':
      return { events: action.payload };
    case 'ADD_EVENT':
      return { events: [action.payload, ...state.events] };
    case 'UPDATE_EVENT':
      return {
        events: state.events.map(event => 
          event.id === action.payload.id ? action.payload : event
        )
      };
    case 'DELETE_EVENT':
      return {
        events: state.events.filter(event => event.id !== action.payload)
      };
    default:
      return state;
  }
};

export const EventContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, { events: [] });

  return (
    <EventContext.Provider value={{ ...state, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};
