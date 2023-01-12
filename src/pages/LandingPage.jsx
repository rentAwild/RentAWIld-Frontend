import React from "react";
import video from "../assets/landingVideo.mp4";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-container">
      <video playsInline autoPlay muted loop poster="photo.jpg" src={video} />
      <div className="text-button-container">
        <div className="text-container">
          <h2 className="quote">
            “If you are clinically insane, by which I mean you wake up in the
            morning, and you think you are an onion, this is your car"
          </h2>
          <p className="quote-name">-Jeremy Clarkson-</p>
        </div>
        <div className="button-container">
          <a href="/signIn">
            <button className="button" type="submit">
              Enter
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
