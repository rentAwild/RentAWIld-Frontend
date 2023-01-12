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
            “ The car has become an article of dress without which we feel uncertain, unclad, and incomplete in the urban compound. "
          </h2>
          <p className="quote-name">-Marshall McLuhan-</p>
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
