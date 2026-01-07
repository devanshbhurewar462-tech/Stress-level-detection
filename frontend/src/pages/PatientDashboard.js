const user = JSON.parse(localStorage.getItem("user"));
<h1 className="welcome-title">Welcome, {user?.fullName} 👋</h1>
import React, { useEffect, useState } from "react";
import "./PatientDashboard.css";
import axios from "axios";
import UploadReports from "./UploadReports";

function PatientDashboard() {
  const [active, setActive] = useState("dashboard"); // ⭐ FIXED
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Dummy realistic biomedical values
  const [data, setData] = useState({
    name: "John Doe",
    age: 23,
    bloodGroup: "B+",
    condition: "Mild stress",
    stressScore: 67,
    stressLevel: "Moderate",
    lastUpdated: "Just now",
    wellnessTip: "Drink water and take a 5-minute breathing break.",
    activitySuggestion: "Take a short walk or do light stretching.",
    ecgHeartRate: 82,
    pulseRate: 79,
    bodyTemp: 36.8,
    spo2: 97,
    hrv: 45,
    weeklyStress: [
      { day: "Mon", score: 70 },
      { day: "Tue", score: 65 },
      { day: "Wed", score: 60 },
      { day: "Thu", score: 72 },
      { day: "Fri", score: 68 },
      { day: "Sat", score: 58 },
      { day: "Sun", score: 63 },
    ]
  });

  useEffect(() => {
    // Right now using dummy values only
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="patient-dashboard loading-screen">
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="patient-dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Patient Panel</h2>

        <ul className="sidebar-menu">
          <li
            className={active === "dashboard" ? "active" : ""}
            onClick={() => setActive("dashboard")}
          >
            🏠 Dashboard
          </li>

          <li
            className={active === "upload" ? "active" : ""}
            onClick={() => setActive("upload")}
          >
            📤 Upload Reports
          </li>

          <li
            className={active === "exercise" ? "active" : ""}
            onClick={() => setActive("exercise")}
          >
            🧘 Mental Exercises
          </li>

          <li
            className={active === "chat" ? "active" : ""}
            onClick={() => setActive("chat")}
          >
            🤖 AI Assistant
          </li>

          <li className="logout-btn">
            <a href="/login">⬅ Logout</a>
          </li>
        </ul>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="dashboard-content">

        {/* DASHBOARD TAB */}
        {active === "dashboard" && (
          <>
            {/* Sensor Data */}
            <div className="ai-card">
              <h3>Sensor Readings</h3>
              <p><strong>ECG Heart Rate:</strong> {data.ecgHeartRate} BPM</p>
              <p><strong>Pulse Rate:</strong> {data.pulseRate} BPM</p>
              <p><strong>Body Temperature:</strong> {data.bodyTemp} °C</p>
              <p><strong>SpO₂:</strong> {data.spo2} %</p>
              <p><strong>HRV:</strong> {data.hrv} ms</p>
            </div>

            {/* AI Generated Suggestions */}
            <div className="card-row">
              <div className="ai-card">
                <h3>Stress Level</h3>
                <p><strong>Score:</strong> {data.stressScore} / 100</p>
                <p><strong>Level:</strong> {data.stressLevel}</p>
                <p className="updated-text">Last updated: {data.lastUpdated}</p>
              </div>

              <div className="ai-card">
                <h3>Wellness Tip</h3>
                <p>{data.wellnessTip}</p>
              </div>

              <div className="ai-card">
                <h3>Suggested Activity</h3>
                <p>{data.activitySuggestion}</p>
              </div>
            </div>

            {/* Weekly Chart */}
            <div className="large-card">
              <h3>Weekly Stress Overview</h3>
              <p className="small-hint">Dummy graph — ML Model will update final values later.</p>

              <div className="weekly-graph">
                {data.weeklyStress.map((item) => (
                  <div key={item.day} className="bar-item">
                    <div className="bar-label">{item.day}</div>
                    <div className="bar-outer">
                      <div
                        className="bar-inner"
                        style={{ height: `${item.score}%` }}
                      ></div>
                    </div>
                    <div className="bar-score">{item.score}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* UPLOAD REPORTS TAB */}
        {active === "upload" && <UploadReports />}

        {/* EXERCISE TAB */}
        {active === "exercise" && <ExerciseSection />}

        {/* CHATBOT TAB */}
        {active === "chat" && <p>AI Chat Assistant (dummy placeholder)</p>}
      </main>
    </div>
  );
}


export default PatientDashboard;
const ExerciseSection = () => {
  const exercises = [
    {
      title: "Breathing Exercise",
      desc: "Reduce anxiety using 4-7-8 breathing technique.",
      video: "https://www.youtube.com/embed/sJ04nsiz_M0",
      image: "/assets/meditation1.jpg"
    },
    {
      title: "Sleep Meditation",
      desc: "Guided sleep meditation for deeper rest.",
      video: "https://www.youtube.com/embed/aEqlQvczMJQ",
      image: "/assets/meditation2.jpg"
    },
    {
      title: "Calm Mind Meditation",
      desc: "A short session to calm your mind instantly.",
      video: "https://www.youtube.com/embed/inpok4MKVLM",
      image: "/assets/meditation3.jpg"
    },
    {
      title: "Stress Relief Yoga",
      desc: "Gentle yoga to reduce stress & tension.",
      video: "https://www.youtube.com/embed/hJbRpHZr_d0",
      image: "/assets/meditation4.jpg"
    }
  ];

  const [video, setVideo] = useState("");

  return (
    <div className="exercise-container">
      <h2>Mental Health Exercises</h2>
      <p className="sub-text">Boost your mental wellbeing with guided activities.</p>

      <div className="exercise-grid">
        {exercises.map((ex, index) => (
          <div className="exercise-card" key={index} onClick={() => setVideo(ex.video)}>
            <img src={ex.image} alt={ex.title} />
            <h3>{ex.title}</h3>
            <p>{ex.desc}</p>
          </div>
        ))}
      </div>

      {video && (
        <div className="video-modal">
          <div className="video-content">
            <span className="close-btn" onClick={() => setVideo("")}>×</span>
            <iframe
              src={video}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="exercise-video"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};
