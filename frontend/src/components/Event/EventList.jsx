import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/events');
        setEvents(response.data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err.message || "Failed to fetch events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul>
      {events.map((event) => (
        <li key={event._id}>
          <Link to={`/events/${event._id}`}>{event.name}</Link> {/* Use Link for navigation */}
        </li>
      ))}
    </ul>
  );
};

export default EventList;