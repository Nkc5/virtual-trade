import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BoothForm from '../Vendor/BoothForm'; // Import BoothForm
import VendorProfile from '../Vendor/VendorProfile';

const VendorDashboard = () => {
  const [vendor, setVendor] = useState(null);
  const userId = localStorage.getItem('userId'); // Get the user ID

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const response = await axios.get(`/vendors/byUser/${userId}`); // Custom route to get vendor by userId
        setVendor(response.data);
      } catch (error) {
        console.error("Error fetching vendor:", error);
      }
    };

    fetchVendorData();
  }, [userId]);

  if (!vendor) {
    return <div>Loading...</div>; // Or a loading indicator
  }

  return (
    <div>
      <h2>Vendor Dashboard</h2>
      <VendorProfile vendor={vendor} /> {/* Pass vendor data to profile component */}
      <BoothForm vendorId={vendor._id} /> {/* Pass vendor ID to booth form */}
      {/* ... other vendor dashboard content */}
    </div>
  );
};

export default VendorDashboard;