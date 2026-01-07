import React from "react";

export default function EmailVerified() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Your Email Has Been Verified 🎉</h1>
      <p>You can now log in to your account.</p>
      <a href="/login" style={{ color: "blue" }}>Go to Login</a>
    </div>
  );
}
