import React, { useEffect } from 'react';
import { useTimetableContext } from '../hooks/useTimetableContext';
import { useAuthContext } from '../hooks/useAuthContext';

const TimetableDisplay = () => {
  const { user } = useAuthContext();
  const { timetable, dispatch } = useTimetableContext();

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/timetables`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await response.json();
        dispatch({ type: 'SET_TIMETABLE', payload: data });
      } catch (error) {
        console.error('Error fetching timetable:', error);
      }
    };

    if (user && user.token) {
      fetchTimetable();
    }
  }, [dispatch, user]);

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-teal-600 text-3xl text-center font-bold mb-6">Timetable</h1>
      {timetable && Object.keys(timetable).length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="bg-teal-100">
                <th className="px-4 py-2 text-teal-700">Day</th>
                <th className="px-4 py-2 text-teal-700">Period 1</th>
                <th className="px-4 py-2 text-teal-700">Period 2</th>
                <th className="px-4 py-2 text-teal-700">Period 3</th>
                <th className="px-4 py-2 text-teal-700">Period 4</th>
                <th className="px-4 py-2 text-teal-700">Period 5</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(timetable)
                .filter((key) => !['_id', 'user_id', '__v'].includes(key)) // Exclude metadata fields
                .map((day) => (
                  <tr key={day} className="border-b hover:bg-teal-50">
                    <td className="px-4 py-2 font-semibold capitalize">{day}</td>
                    {(Array.isArray(timetable[day]) ? timetable[day] : []).map((period, index) => (
                      <td key={index} className="px-4 py-2">
                        {period}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>Loading timetable...</div>
      )}
    </div>
  );
};

export default TimetableDisplay;
