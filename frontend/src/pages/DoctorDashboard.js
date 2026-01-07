import React, { useState } from "react";
import "./DoctorDashboard.css";
import axios from "axios";

export default function DoctorDashboard() {
  const [active, setActive] = useState("dashboard");

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const patients = [
    { name: "Rahul Sharma", age: 24, status: "High Stress" },
    { name: "Sneha Patil", age: 29, status: "Normal" },
    { name: "Amit Verma", age: 33, status: "Low HRV" },
  ];

  const [formData, setFormData] = useState({
    hf_ms2: "", avnn_ms: "", mean_hr_bpm: "", lf_hf_ratio: "",
    sdnn_ms: "", lf_norm_nu: "", hf_norm_nu: "", lf_ms2: "",
    rmssd_ms: "", pnn50_percent: "", nn50_beats: ""
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/ml/predict", formData);
      setResult(res.data?.ml_result?.prediction ?? res.data);
    } catch (err) {
      console.error(err);
      alert("Prediction failed");
    }
  };

  return (
    <div className="doctor-dashboard">
      <aside className="sidebar">
        <h2 className="sidebar-title">Doctor Panel</h2>
        <ul className="sidebar-menu">
          <li className={active === "dashboard" ? "active" : ""} onClick={() => setActive("dashboard")}>
            <span className="icon">🏠</span> Dashboard
          </li>
          <li className={active === "upload" ? "active" : ""} onClick={() => setActive("upload")}>
            <span className="icon">📤</span> HRV Analysis
          </li>
          <li className={active === "patients" ? "active" : ""} onClick={() => setActive("patients")}>
            <span className="icon">👥</span> Patient List
          </li>
          <li className={active === "reports" ? "active" : ""} onClick={() => setActive("reports")}>
            <span className="icon">📊</span> Patient Reports
          </li>
          <li className={active === "chat" ? "active" : ""} onClick={() => setActive("chat")}>
            <span className="icon">🤖</span> AI Assistant
          </li>
          <li className="logout-btn"><a href="/login">⬅ Logout</a></li>
        </ul>
      </aside>

      <main className="dashboard-content">
        {active === "dashboard" && (
          <div>
            <h1 className="welcome-title">Welcome, Dr. {user?.fullName ?? "User"} 👋</h1>
            <h2 className="section-title">Overview</h2>
            <div className="card-row">
              <div className="ai-card"><h3>Total Patients</h3><p className="big-number">{patients.length}</p></div>
              <div className="ai-card"><h3>Critical Alerts</h3><p className="big-number">2</p></div>
              <div className="ai-card"><h3>Pending Analysis</h3><p className="big-number">1</p></div>
            </div>
          </div>
        )}

        {active === "upload" && (
          <div className="upload-section">
            <h2 className="section-title">HRV Data Entry</h2>
            <p className="section-subtitle">Input HRV features to analyze patient stress levels.</p>
            <form className="ml-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                {Object.keys(formData).map((key) => (
                  <div key={key} className="form-group">
                    <label>{key.replace(/_/g, " ").toUpperCase()}</label>
                    <input
                      name={key}
                      type="number"
                      step="any"
                      value={formData[key]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}
              </div>
              <button type="submit" className="submit-btn">Analyze Stress Level</button>
            </form>

            {result !== null && (
              <div className={`prediction-result ${Number(result) === 1 ? 'high-stress' : 'low-stress'}`}>
                <h3>Result: {Number(result) === 1 ? "⚠️ High Stress" : "✅ Low Stress"}</h3>
              </div>
            )}
          </div>
        )}

        {active === "patients" && (
          <div>
            <h2 className="section-title">Patient List</h2>
            <table className="patient-table">
              <thead><tr><th>Name</th><th>Age</th><th>Status</th></tr></thead>
              <tbody>
                {patients.map((p, i) => (
                  <tr key={i}><td>{p.name}</td><td>{p.age}</td><td className={p.status.includes("High") ? "red-text" : ""}>{p.status}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {active === "chat" && (
          <div className="ai-chat-placeholder">
            <h2 className="section-title">AI Assistant</h2>
            <p>AI Chat functionality coming soon...</p>
          </div>
        )}
      </main>
    </div>
  );
}