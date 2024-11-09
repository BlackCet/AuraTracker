// useTimetableContext.js
import { useContext } from 'react';
import { TimetableContext } from '../context/TimetableContext';

export const useTimetableContext = () => {
  const context = useContext(TimetableContext);
  if (!context) {
    throw Error('useTimetableContext must be used inside a TimetableContextProvider');
  }
  return context;
};
