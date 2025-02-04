import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
    return (
        <div className="event-card">
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <Link to={`/events/${event._id}`}>View Details</Link>
        </div>
    );
};

export default EventCard;