import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RoomDetails = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLocked, setIsLocked] = useState(false); // State for room lock status

  useEffect(() => {
    const fetchRoom = async () => {
        setLoading(true);
      try {
        const response = await axios.get(`/rooms/${roomId}`);
        setRoom(response.data);
        setIsLocked(response.data.status === 'locked'); // Set initial lock status
      } catch (err) {
        console.error("Error fetching room details:", err);
        setError(err.message || "Failed to fetch room details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  const handleLockToggle = async () => {
    try {
      const newStatus = isLocked ? 'unlocked' : 'locked'; // Toggle status
      await axios.put(`/rooms/${roomId}`, { status: newStatus }); // Update room status on the server
      setIsLocked(!isLocked); // Update local state
      setRoom({ ...room, status: newStatus }); // Update room data
    } catch (error) {
      console.error("Error toggling room lock:", error);
    }
  };

  if (loading) {
    return <div>Loading room details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>{room.name}</h2>
      {/* Display other room details (capacity, features, etc.) */}
      <p>Capacity: {room.capacity}</p>
      <ul>
          {room.features && room.features.map((feature, index) => (
              <li key={index}>{feature}</li>
          ))}
      </ul>

      <button onClick={handleLockToggle}>
        {isLocked ? 'Unlock Room' : 'Lock Room'}
      </button>
    </div>
  );
};

export default RoomDetails;