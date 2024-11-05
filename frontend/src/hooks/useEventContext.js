// useEventContext.js
import { useContext } from 'react';
import { EventContext } from '../context/EventContext';

export const useEventContext = () => {
  const context = useContext(EventContext);

  if (!context) {
    throw Error('useEventContext must be used inside an EventContextProvider');
  }

  return context;
};
