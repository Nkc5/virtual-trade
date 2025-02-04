import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EventForm from './EventForm'; // Import the EventForm
import RoomList from '../Room/RoomList';

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State for edit mode

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/events/${eventId}`);
        setEvent(response.data);
      } catch (err) {
        console.error("Error fetching event details:", err);
        setError(err.message || "Failed to fetch event details.");
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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };


  return (
    <div>
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      {/* Display other event details (date, etc.) */}

      {/* Conditionally render the EventForm for editing */}
      {isEditing ? (
        <EventForm event={event} onCancel={handleCancelEdit} />
      ) : (
        <>
          <button onClick={handleEditClick}>Edit Event</button>
          {/* Add a delete button and functionality here */}
        </>
      )}

      <h3>Rooms</h3>
      <RoomList rooms={event.rooms} eventId={eventId} />
    </div>
  );
};

export default EventDetails;