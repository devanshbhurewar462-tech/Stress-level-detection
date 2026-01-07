import React from "react";
import Header from "../components/Header";
import "./Contact.css";

function Contact() {
  return (
    <>
      <Header />

      <div className="contact-page">
        <div className="contact-card">
          <h2>Contact Us</h2>
          <p className="sub-text">
            Have questions? We're here to help!
          </p>

          <div className="contact-container">

            {/* CONTACT FORM */}
            <form className="contact-form">
              <label>Your Name</label>
              <input type="text" placeholder="Enter your name" required />

              <label>Email Address</label>
              <input type="email" placeholder="you@example.com" required />

              <label>Message</label>
              <textarea
                placeholder="Type your message here..."
                required
              ></textarea>

              <button className="send-btn">Send Message</button>
            </form>

            {/* CONTACT INFO */}
            <div className="contact-info">
              <h3>Get in Touch</h3>
              <p>📧 Email: support@mindwell.ai</p>
              <p>📞 Phone: +91 9876543210</p>
              <p>🏢 Address: Pune, Maharashtra, India</p>

              <div className="map-box">
                Map View (Coming Soon)
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
