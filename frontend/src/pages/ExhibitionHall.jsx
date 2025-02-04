import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import BoothList from '../components/Booth/BoothList'; // Import BoothList

const ExhibitionHall = () => {
  const { eventId } = useParams();

  return (
    <div>
      <h2>Exhibition Hall</h2>
      <BoothList eventId={eventId} /> {/* Pass eventId to BoothList */}
      {/* ... any other content for the exhibition hall ... */}
    </div>
  );
};

export default ExhibitionHall;