import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RoomList = ({ rooms, eventId }) => { // Receive rooms and eventId as props
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
        setLoading(true);
        try {
            if (rooms && rooms.length > 0) {
                setRoomData(rooms);
            } else if (eventId) {
                const response = await axios.get('/rooms', { params: { eventId } }); // Filter by eventId
                setRoomData(response.data);
            }
        } catch (err) {
            console.error("Error fetching rooms:", err);
            setError(err.message || "Failed to fetch rooms.");
        } finally {
            setLoading(false);
        }
    };

    fetchRooms();
  }, [rooms, eventId]);

  if (loading) {
    return <div>Loading rooms...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul>
      {roomData.map((room) => (
        <li key={room._id}>
          <Link to={`/auditorium/${room._id}`}>{room.name}</Link> {/* Link to RoomDetails */}
        </li>
      ))}
    </ul>
  );
};

export default RoomList;