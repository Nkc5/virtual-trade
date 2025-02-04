import React, { useState } from 'react';
import axios from 'axios';

const VendorProfile = ({ vendor }) => { // Receive vendor data as a prop
  const [vendorData, setVendorData] = useState(vendor); // Initialize with vendor data
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setVendorData({ ...vendorData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`/vendors/${vendor._id}`, vendorData); // Update vendor data on server
      setEditing(false); // Switch back to viewing mode
      alert("Profile updated successfully!"); // Or a better user feedback
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle error (e.g., display an error message)
    }
  };

  return (
    <div>
      {editing ? ( // Editing mode
        <form>
          {/* Input fields for all vendor properties (businessName, boothNumber, etc.) */}
          <input type="text" name="businessName" placeholder="Business Name" value={vendorData.businessName} onChange={handleChange} />
          {/* ... other input fields ... */}
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : ( // Viewing mode
        <div>
          <h2>{vendor.businessName}</h2>
          {/* Display other vendor details */}
          <p>Booth Number: {vendor.boothNumber}</p>
          {/* ... other details ... */}
          <button onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default VendorProfile;