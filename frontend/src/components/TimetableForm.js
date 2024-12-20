import React, { useState } from 'react';
import { useTimetableContext } from '../hooks/useTimetableContext';
import { useAuthContext } from '../hooks/useAuthContext';

const TimetableForm = () => {
  const { user } = useAuthContext();
  const { formData, dispatch } = useTimetableContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (day, index, value) => {
    dispatch({
      type: 'UPDATE_FORM',
      payload: { day, index, value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      user_id: user._id, // Use user_id here to match the backend
    };
  
    try {
      setLoading(true); // Set loading state to true
      setError(''); // Clear previous errors
  
      const response = await fetch('/api/timetables', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(dataToSubmit),
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Read error response as text
        console.error("Error saving timetable:", errorText);
        setError("Failed to save timetable.");
      } else {
        alert("Timetable saved successfully.");
        const updatedData = await response.json();
        dispatch({ type: 'SET_TIMETABLE', payload: updatedData });
      }
      
    } catch (error) {
      console.error("Error saving timetable:", error);
      setError("Failed to save timetable.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-teal-600 text-3xl text-center font-bold mb-6">Update Timetable</h1>
      {error && <p className="text-red-600 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg shadow-lg">
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
              {Object.keys(formData).map((day) => (
                <tr key={day} className="border-b hover:bg-teal-50">
                  <td className="px-4 py-2 font-semibold capitalize">{day}</td>
                  {formData[day].map((period, index) => (
                    <td key={index} className="px-4 py-2">
                      <input
                        type="text"
                        value={period}
                        onChange={(e) => handleInputChange(day, index, e.target.value)}
                        className="input input-bordered w-full"
                        placeholder={`Period ${index + 1}`}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          type="submit"
          className="btn mt-4 bg-teal-600 text-white hover:bg-teal-700 py-2 px-4 rounded-lg shadow-md"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Saving...' : 'Save Timetable'}
        </button>
      </form>
    </div>
  );
};

export default TimetableForm;
