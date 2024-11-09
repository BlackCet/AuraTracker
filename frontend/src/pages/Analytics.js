// src/components/Analytics.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';  // Bar chart import
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useAuthContext } from '../hooks/useAuthContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = () => {
  const { user } = useAuthContext(); // Get the user from the context
  const [data, setData] = useState({
    totalAssignmentsCompleted: 0,
    totalGoalsCompleted: 0,
    points: 0,
    badges: [],
  });

  // Fetch analytics data for the authenticated user
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        if (user && user.token) {
          const response = await fetch('/api/user/me', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${user.token}`, // Use the user's token from context
            },
          });
          const result = await response.json();
          setData({
            totalAssignmentsCompleted: result.assignmentsCompleted,
            totalGoalsCompleted: result.goalsCompleted,
            points: result.points,
            badges: result.badges,
          });
        }
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    if (user) {
      fetchAnalytics();
    }
  }, [user]);

  // Bar chart data with only Assignments and Goals
  const chartData = {
    labels: ['Assignments', 'Goals'], // Only two categories
    datasets: [
      {
        label: 'Progress', // Label for the bars
        data: [data.totalAssignmentsCompleted, data.totalGoalsCompleted], // Y-values (user's data)
        backgroundColor: ['#FF5733', '#33FF57'], // Color of the bars
        borderColor: ['#FF5733', '#33FF57'], // Border color for bars
        borderWidth: 1, // Border thickness
      },
    ],
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">Study Tracker Analytics</h1>

      {/* Displaying Key Metrics */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-xl">Assignments Completed</h3>
          <p className="text-2xl font-semibold">{data.totalAssignmentsCompleted}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-xl">Goals Completed</h3>
          <p className="text-2xl font-semibold">{data.totalGoalsCompleted}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-xl">Points</h3>
          <p className="text-2xl font-semibold">{data.points}</p>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
        <Bar data={chartData} />
      </div>

      {/* Displaying Badges */}
      <div className="bg-white p-6 rounded shadow-md">
        <h3 className="text-2xl font-bold">Badges Earned</h3>
        <ul className="mt-4">
          {data.badges.length > 0 ? (
            data.badges.map((badge, index) => (
              <li key={index} className="text-lg">{badge}</li>
            ))
          ) : (
            <p>No badges earned yet</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Analytics;
