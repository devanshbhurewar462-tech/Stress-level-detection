import React, { useState } from "react";
import "./UploadPrescription.css";

export default function UploadPrescription() {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please choose a file!");
      return;
    }

    setSuccess(true);
  };

  return (
    <div className="upload-container">
      <h2>Upload Prescription</h2>
      <p className="sub-text">Upload JPG, PNG, or PDF prescription for patients.</p>

      <form onSubmit={handleSubmit} className="upload-box">
        <input 
          type="file" 
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button type="submit" className="btn-upload">Upload</button>
      </form>

      {success && (
        <p className="success-msg">Prescription uploaded successfully! ✔</p>
      )}
    </div>
  );
}
