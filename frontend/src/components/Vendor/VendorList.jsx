import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/vendors'); // or '/vendors' if you want all vendors
        setVendors(response.data);
      } catch (err) {
        console.error("Error fetching vendors:", err);
        setError(err.message || "Failed to fetch vendors.");
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  if (loading) {
    return <div>Loading vendors...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul>
      {vendors.map((vendor) => (
        <li key={vendor._id}>
          <Link to={`/vendors/${vendor._id}`}>{vendor.businessName || "Vendor " + vendor._id}</Link> {/* Display business name or a default */}
        </li>
      ))}
    </ul>
  );
};

export default VendorList;