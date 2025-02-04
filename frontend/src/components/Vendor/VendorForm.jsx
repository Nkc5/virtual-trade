import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VendorForm = ({ onCancel }) => {
    const [vendorData, setVendorData] = useState({
        userId: '', // You'll need a way to select the user (e.g., a dropdown)
        boothNumber: '',
        boothMedia: [],
        banners: [],
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setVendorData({ ...vendorData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/vendors', vendorData);
            navigate('/dashboard'); // Redirect after creating vendor
        } catch (error) {
            console.error("Error creating vendor:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* A dropdown or other way to select the userId */}
            <input type="text" name="userId" placeholder="User ID" onChange={handleChange} required /> {/* Temporary input, replace with a proper select */}
            <input type="text" name="boothNumber" placeholder="Booth Number" onChange={handleChange} />
            {/* ... other input fields (boothMedia, banners) ... */}
            <button type="submit">Create Vendor</button>
            {onCancel && <button onClick={onCancel}>Cancel</button>}
        </form>
    );
};

export default VendorForm;