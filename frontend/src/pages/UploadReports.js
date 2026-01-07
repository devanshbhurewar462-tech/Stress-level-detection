import React, { useState } from "react";
import "./UploadReports.css";

function UploadReports() {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!file) return alert("Please choose a file!");
    alert("Dummy: File uploaded successfully. AI/ML analysis will be shown here later.");
  };

  return (
    <div className="upload-container">
      <h2>Upload Health Reports</h2>
      <p className="sub-text">
        Upload ECG/PPG/SpO2/Temperature reports.  
        (Right now dummy mode is enabled for project submission.)
      </p>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button onClick={handleUpload}>Upload</button>

      <div className="result-box">
        <h3>Dummy AI Analysis</h3>
        <p>• ECG: Normal sinus rhythm</p>
        <p>• HRV: 52 ms (Moderate Stress)</p>
        <p>• Pulse Rate: 78 BPM</p>
        <p>• Body Temperature: 36.7°C</p>
        <p>• SpO₂: 97%</p>
        <p className="interpret">
          AI Interpretation: Mild physiological stress detected. Practice deep breathing.
        </p>
      </div>
    </div>
  );
}

export default UploadReports;
