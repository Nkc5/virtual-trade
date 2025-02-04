import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Cloudinary } from "@cloudinary/url-gen";
// import { AdvancedImage } from "@cloudinary/react";
// import { fill } from "@cloudinary/url-gen/actions/resize";

// const cloudName = "process.env.REACT_APP_CLOUDINARY_CLOUD_NAME" // Get cloud name from env
// const cld = new Cloudinary({
//   cloud: {
//     cloudName: cloudName
//   }
// });


const BoothForm = ({ vendorId }) => {
  const [boothData, setBoothData] = useState({
    boothNumber: '',
    media: [], // Array of media URLs
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleChange = (e) => {
    setBoothData({ ...boothData, [e.target.name]: e.target.value });
  };

  const handleMediaUpload = async (e) => {
    const files = e.target.files;
    const newUploadedFiles = [];

    for (const file of files) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET); // Replace with your upload preset

            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.secure_url) {
                newUploadedFiles.push(data.secure_url);
            } else {
                console.error('Cloudinary upload error:', data);
            }
        } catch (error) {
            console.error('Cloudinary upload error:', error);
        }
    }

    setUploadedFiles([...uploadedFiles, ...newUploadedFiles]);
    setBoothData({ ...boothData, media: [...boothData.media, ...newUploadedFiles] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/vendors/${vendorId}`, boothData); // Update vendor with booth data
      alert("Booth details updated successfully!");
    } catch (error) {
      console.error("Error updating booth:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="boothNumber" placeholder="Booth Number" value={boothData.boothNumber} onChange={handleChange} required />
      <input type="file" multiple onChange={handleMediaUpload} /> {/* Allow multiple file uploads */}

      {/* Display uploaded media */}
      <div>
          {uploadedFiles.map((file, index) => (
              <div key={index}>
                <AdvancedImage cldImg={cld.image(file)} width={100} crop="scale" />
              </div>
          ))}
      </div>

      <button type="submit">Save Booth</button>
    </form>
  );
};

export default BoothForm;