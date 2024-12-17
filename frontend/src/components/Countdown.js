import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { formatDistanceToNow } from 'date-fns';

const Countdown = () => {
  const { user } = useAuthContext();
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/events`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        // Filter to show events that start from the current time onward
        const now = new Date();
        const events = response.data.filter(event => new Date(event.start) >= now);
        setUpcomingEvents(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (user) fetchUpcomingEvents();
  }, [user]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events Countdown</h2>
      {upcomingEvents.length > 0 ? (
        upcomingEvents.map((event) => (
          <div key={event.id} className="mb-4">
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p>Starts in {formatDistanceToNow(new Date(event.start), { addSuffix: true })}</p>
          </div>
        ))
      ) : (
        <p>No upcoming events found.</p>
      )}
    </div>
  );
};

export default Countdown;
