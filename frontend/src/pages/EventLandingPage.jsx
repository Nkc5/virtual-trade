import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RoomList from '../components/Room/RoomList';
// import BoothList from '../components/Booth/BoothList'; // Import BoothList

const EventLandingPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/events/${eventId}`);
        setEvent(response.data);
      } catch (err) {
        console.error("Error fetching event:", err);
        setError(err.message || "Failed to fetch event.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return <div>Loading event details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!event) {
    return <div>Event not found.</div>;
  }

  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      {/* ... other event details ... */}

      <h2>Rooms</h2>
      <RoomList rooms={event.rooms} eventId={eventId} />

      <h2>Booths</h2>
      <BoothList eventId={eventId} /> {/* Pass eventId to BoothList */}

      {/* ... other sections of the landing page (schedule, sponsors, etc.) ... */}
    </div>
  );
};

export default EventLandingPage;