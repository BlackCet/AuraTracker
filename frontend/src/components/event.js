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
    setCurrentEvent({ start: arg.dateStr, end: arg.dateStr });
    setModalOpen(true);
  };

  const handleEventClick = (clickInfo) => {
    const { event } = clickInfo;
    setTitle(event.title);
    setCurrentEvent({
      id: event.id,
      start: event.start.toISOString(),
      end: event.end ? event.end.toISOString() : null,
    });
    setModalOpen(true);
  };

  const saveEvent = async () => {
    const newEvent = {
      title,
      start: currentEvent.start,
      end: currentEvent.end,
      user_id: user.id,
    };

    try {
      if (currentEvent.id) {
        const res = await axios.patch(`/api/events/${currentEvent.id}`, newEvent, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        dispatch({ type: 'UPDATE_EVENT', payload: res.data });
      } else {
        const res = await axios.post('/api/events', newEvent, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        dispatch({ type: 'ADD_EVENT', payload: res.data });
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
