import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./VerifyEmail.css";

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("Verifying...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/verify/${token}`);

        setStatus("Email Verified Successfully!");
        setSuccess(true);

        setTimeout(() => navigate("/login"), 2000);

      } catch (err) {
        setStatus("Invalid or expired verification link!");
        setSuccess(false);
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div className="verify-container">
      <div className="verify-box">

        <h2>{success ? "✔ Verified" : "❌ Verification Failed"}</h2>
        <p>{status}</p>

        {!success && (
          <button className="btn-verify" onClick={() => navigate("/login")}>
            Go to Login
          </button>
        )}

      </div>
    </div>
  );
}

export default VerifyEmail;
