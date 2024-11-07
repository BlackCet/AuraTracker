// Event.jsx
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEventContext } from '../hooks/useEventContext';

const Event = () => {
  const { user } = useAuthContext();
  const { events, dispatch } = useEventContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('12:00'); // default start time
  const [endTime, setEndTime] = useState(''); // optional end time

  useEffect(() => {
    const fetchEvents = async () => {
      if (!user) {
        alert('Please log in to view your events.');
        return;
      }

      try {
        const response = await axios.get('/api/events', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const eventsWithIds = response.data.map(event => ({
          ...event,
          id: event._id,
        }));

        dispatch({ type: 'SET_EVENTS', payload: eventsWithIds });
      } catch (error) {
        console.error('Error fetching events:', error);
        alert('Failed to fetch events. Please check your authentication and try again.');
      }
    };

    fetchEvents();
  }, [user, dispatch]);

  const handleDateClick = (arg) => {
    setTitle('');
    setStartTime('12:00'); // Reset start time for new event
    setEndTime(''); // Reset end time for new event
    setCurrentEvent({ start: arg.dateStr, end: arg.dateStr });
    setModalOpen(true);
  };

  const handleEventClick = (clickInfo) => {
    const { event } = clickInfo;
    setTitle(event.title);
    setStartTime(event.start.toTimeString().slice(0, 5)); // set start time
    setEndTime(event.end ? event.end.toTimeString().slice(0, 5) : ''); // set end time if exists
    setCurrentEvent({
      id: event.id,
      start: event.start.toISOString().split('T')[0], // just the date part
      end: event.end ? event.end.toISOString().split('T')[0] : event.start.toISOString().split('T')[0],
    });
    setModalOpen(true);
  };

  const saveEvent = async () => {
    if (!title.trim()) {
      alert("Event title cannot be empty.");
      return;
    }

    const fullStart = `${currentEvent.start}T${startTime}:00`;
    const fullEnd = endTime ? `${currentEvent.end}T${endTime}:00` : fullStart;

    const newEvent = {
      title,
      start: fullStart,
      end: fullEnd,
      user_id: user.id,
    };

    try {
      if (currentEvent.id) {
        const res = await axios.patch(`/api/events/${currentEvent.id}`, newEvent, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        dispatch({ type: 'UPDATE_EVENT', payload: res.data }); // Update state immediately
      } else {
        const res = await axios.post('/api/events', newEvent, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        dispatch({ type: 'ADD_EVENT', payload: res.data }); // Add to state immediately
      }
      setModalOpen(false);
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save event. Please try again.');
    }
  };

  const handleEventDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`/api/events/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        dispatch({ type: 'DELETE_EVENT', payload: id });
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event. Please try again.');
      }
    }
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-teal-dark text-3xl text-center font-bold mb-6">Event Calendar</h1>
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          className="w-full"
        />
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal modal-open bg-black bg-opacity-50">
            <div className="modal-box">
              <h2 className="text-teal-light font-bold text-lg mb-2">Event Details</h2>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Event Title"
                className="input input-bordered w-full mt-2"
              />
              <div className="flex mt-4 space-x-2">
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="input input-bordered w-full"
                />
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="End Time"
                />
              </div>
              <div className="modal-action mt-4">
                <button className="btn" onClick={saveEvent}>
                  Save
                </button>
                <button className="btn" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                {currentEvent?.id && (
                  <button
                    className="btn btn-error ml-2"
                    onClick={() => handleEventDelete(currentEvent.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Event;
