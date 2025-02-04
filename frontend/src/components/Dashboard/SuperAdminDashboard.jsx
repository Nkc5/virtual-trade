import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventList from '../Event/EventList';
import VendorList from '../Vendor/VendorList';
import UserList from '../User/UserList'; 

const SuperAdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all events, vendors, and users
    const fetchData = async () => {
      try {
        const eventsResponse = await axios.get('/events');
        setEvents(eventsResponse.data);

        const vendorsResponse = await axios.get('/vendors');
        setVendors(vendorsResponse.data);

        const usersResponse = await axios.get('/users');
        setUsers(usersResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Super Admin Dashboard</h2>

      <h3>Events</h3>
      <EventList events={events} /> {/* Pass events as props */}

      <h3>Vendors</h3>
      <VendorList vendors={vendors} /> {/* Pass vendors as props */}

      <h3>Users</h3>
      <UserList users={users} /> {/* Pass users as props */}

      {/* ... other dashboard content */}
    </div>
  );
};

export default SuperAdminDashboard;