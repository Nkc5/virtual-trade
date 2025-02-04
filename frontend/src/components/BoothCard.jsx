import React from 'react';
import { Link } from 'react-router-dom';

const BoothCard = ({ booth }) => {
    return (
        <div className="booth-card">
            <h3>Booth {booth.boothNumber}</h3>
            <Link to={`/booths/${booth._id}`}>View Details</Link>
        </div>
    );
};

export default BoothCard;