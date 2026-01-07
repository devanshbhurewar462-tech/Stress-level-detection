import React, { useState, useEffect } from "react";
import "./Home.css";
import Header from "../components/Header";

// Slider Images
import slide1 from "../assets/slider1.jpg";
import slide2 from "../assets/slider2.jpg";
import slide3 from "../assets/slider3.jpg";
import slide4 from "../assets/slider4.jpg";

const exerciseVideos = {
  sleep: "https://www.youtube.com/embed/aEqlQvczMJQ",
  breathing: "https://www.youtube.com/embed/sJ04nsiz_M0",
  meditation: "https://www.youtube.com/embed/inpok4MKVLM",
  yoga: "https://www.youtube.com/embed/hJbRpHZr_d0",
  relaxmusic: "https://www.youtube.com/embed/2OEL4P1Rz04",
  bodyscan: "https://www.youtube.com/embed/QHkXvPq2pQE",
  focus: "https://www.youtube.com/embed/1vx8iUvfyCY",
  energizer: "https://www.youtube.com/embed/Q-qkXt9pPp8"
};

function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [slide1, slide2, slide3, slide4];

  useEffect(() => {
    const nextSlide = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(nextSlide);
  }, [slides.length]);

  const openVideo = (url) => {
    setVideoUrl(url);
    setShowVideo(true);
  };

  const closeVideo = () => {
    setVideoUrl("");
    setShowVideo(false);
  };

  const exerciseData = [
    { id: "sleep", title: "Better Sleep", img: "https://picsum.photos/seed/sleep/500/300", desc: "Guided sleep meditation for deeper rest." },
    { id: "breathing", title: "Deep Breathing", img: "https://picsum.photos/seed/breath/500/300", desc: "4-7-8 breathing to reduce anxiety." },
    { id: "meditation", title: "Calm Meditation", img: "https://picsum.photos/seed/calm/500/300", desc: "10-minute mindfulness meditation." },
    { id: "yoga", title: "Anxiety Relief Yoga", img: "https://picsum.photos/seed/yoga/500/300", desc: "Gentle yoga flow to release tension." },
    { id: "relaxmusic", title: "Relaxing Music", img: "https://picsum.photos/seed/music/500/300", desc: "Soothing sounds to calm your mind." },
    { id: "bodyscan", title: "Body Scan", img: "https://picsum.photos/seed/body/500/300", desc: "Release tension by scanning your body." },
    { id: "focus", title: "Focus Meditation", img: "https://picsum.photos/seed/focus/500/300", desc: "Improve concentration & clarity." },
    { id: "energizer", title: "Morning Energizer", img: "https://picsum.photos/seed/morning/500/300", desc: "Boost energy and start fresh." }
  ];

  return (
    <>
      <Header />

      <div className="slider-container">
        {slides.map((img, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}
      </div>

      <section className="features-section">
        <h2>Mental Health Exercises</h2>
        <p className="sub-text">Improve your wellbeing with guided activities designed for stress relief.</p>

        <div className="card-row">
          {exerciseData.map((item) => (
            <div key={item.id} className="feature-card" onClick={() => openVideo(exerciseVideos[item.id])}>
              <img src={item.img} alt={item.title} />
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2>About The Project</h2>
        <p>This platform focuses on mental health improvement using guided exercises, meditation practices, and mindfulness routines.</p>
      </section>

      <footer className="footer">© 2025 Mental Health Monitoring</footer>

      {showVideo && (
        <div className="video-modal" onClick={closeVideo}>
          <div className="video-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={closeVideo}>&times;</button>
            <iframe
              src={videoUrl}
              title="Exercise Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;