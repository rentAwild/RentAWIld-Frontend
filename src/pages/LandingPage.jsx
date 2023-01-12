import React from "react";
import video from "../assets/landingVideo.mp4";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-container">
      <video playsInline autoPlay muted loop poster="photo.jpg" src={video} />
      <h1>Wild to Rent</h1>
      <p></p>
      <button type="submit">Sign In</button>
    </div>
  );
}

export default LandingPage;
