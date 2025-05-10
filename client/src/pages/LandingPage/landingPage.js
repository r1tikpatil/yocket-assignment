import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useGame } from "../../hooks/GameHook";
import { copsData } from "../../utils/utils";

const LandingPage = () => {
  const {
    setGameStarted,
    setCities,
    setCurrentCopIndex,
    setCops,
    setGameCompleted,
    setGameResult,
  } = useGame();
  const navigate = useNavigate();

  const startGame = async () => {
    try {
      // Start a new game
      await api.post("/game/start");

      // Fetch cities
      const citiesResponse = await api.get("/cities");
      setCities(citiesResponse.data);

      // Reset game state
      setCurrentCopIndex(0);
      setCops(copsData);
      setGameCompleted(false);
      setGameResult(null);

      // Mark game as started and navigate to city selection
      setGameStarted(true);
      navigate("/city-selection");
    } catch (error) {
      console.error("Error starting game:", error);
      alert("Failed to start the game. Please try again.");
    }
  };

  return (
    <div className="landing-page">
      <div className="container">
        <h1>Operation: Fugitive Hunter</h1>
        <p className="subtitle">
          A notorious criminal escape artist is on the loose!
        </p>

        <div className="info-card">
          <h2>Mission Brief</h2>
          <p>
            The fugitive is hiding in one of five nearby cities. We need your
            help to coordinate three fearless cops to capture this elusive
            criminal.
          </p>

          <div className="mission-details">
            <div className="detail-item">
              <h3>The Challenge</h3>
              <p>
                You must strategically assign each cop to investigate a
                different city.
              </p>
            </div>

            <div className="detail-item">
              <h3>The Cities</h3>
              <ul>
                <li>Yapkashnagar (60KM)</li>
                <li>Lihaspur (50KM)</li>
                <li>Narmis City (40KM)</li>
                <li>Shekharvati (30KM)</li>
                <li>Nuravgram (20KM)</li>
              </ul>
            </div>

            <div className="detail-item">
              <h3>The Resources</h3>
              <ul>
                <li>2 EV Bikes (60KM range)</li>
                <li>1 EV Car (100KM range)</li>
                <li>1 EV SUV (120KM range)</li>
              </ul>
              <p>
                <strong>Important:</strong> Each vehicle must have enough range
                for a round trip!
              </p>
            </div>
          </div>
        </div>

        <button className="start-button" onClick={startGame}>
          Start Mission
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
