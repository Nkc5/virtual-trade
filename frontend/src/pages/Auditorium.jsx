import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Chat from '../components/Chat/Chat';

const Auditorium = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchRoom = async () => {
        setLoading(true);
      try {
        const response = await axios.get(`/rooms/${roomId}`);
        setRoom(response.data);
        setIsLocked(response.data.status === 'locked');
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
      const newStatus = isLocked ? 'unlocked' : 'locked';
      await axios.put(`/rooms/${roomId}`, { status: newStatus });
      setIsLocked(!isLocked);
      setRoom({ ...room, status: newStatus });
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

  if (!room) {
    return <div>Room not found.</div>;
  }

  return (
    <div>
      <h2>{room.name}</h2>
      <p>Capacity: {room.capacity}</p>
      <ul>
        {room.features && room.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      <button onClick={handleLockToggle}>
        {isLocked ? 'Unlock Room' : 'Lock Room'}
      </button>

      {room.features && room.features.includes('chat') && (
        <Chat userId={userId} receiverId={room._id} boothId={null} />
      )}

      {room.features && room.features.includes('liveVideo') && (
        <div>
          {/* Implement live video streaming here */}
          <p>Live video will be displayed here.</p>
        </div>
      )}

      {room.features && room.features.includes('recording') && (
        <div>
          {/* Implement recorded video playback here */}
          <p>Recorded video will be displayed here.</p>
        </div>
      )}
    </div>
  );
};

export default Auditorium;