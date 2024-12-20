import { createContext, useReducer, useEffect } from 'react';

export const TimetableContext = createContext();

const timetableReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TIMETABLE':
      return { ...state, timetable: action.payload };
    case 'UPDATE_FORM':
      const updatedForm = { ...state.formData };
      updatedForm[action.payload.day][action.payload.index] = action.payload.value;
      return { ...state, formData: updatedForm };
    case 'RESET_FORM':
      return {
        ...state,
        formData: {
          monday: ['', '', '', '', ''],
          tuesday: ['', '', '', '', ''],
          wednesday: ['', '', '', '', ''],
          thursday: ['', '', '', '', ''],
          friday: ['', '', '', '', ''],
        },
      };
    default:
      return state;
  }
};
export const TimetableContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(timetableReducer, {
    timetable: null,
    formData: {
      monday: ['', '', '', '', ''],
      tuesday: ['', '', '', '', ''],
      wednesday: ['', '', '', '', ''],
      thursday: ['', '', '', '', ''],
      friday: ['', '', '', '', ''],
    },
  });

  // Fetch timetable from localStorage or server
  useEffect(() => {
    const savedTimetable = localStorage.getItem('timetable');
    if (savedTimetable) {
      dispatch({
        type: 'SET_TIMETABLE',
        payload: JSON.parse(savedTimetable),
      });
    } else {
      // Fetch timetable from API if not found in localStorage
      const fetchTimetable = async () => {
        try {
          const response = await fetch('/api/timetables');
          const data = await response.json();
          dispatch({ type: 'SET_TIMETABLE', payload: data });
          // Save the timetable in localStorage
          localStorage.setItem('timetable', JSON.stringify(data));
        } catch (error) {
          console.error('Error fetching timetable:', error);
        }
      };
      fetchTimetable();
    }
  }, []);

  return (
    <TimetableContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TimetableContext.Provider>
  );
};
