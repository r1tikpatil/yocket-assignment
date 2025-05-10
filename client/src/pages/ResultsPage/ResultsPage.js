import React from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../../hooks/GameHook";

const ResultsPage = () => {
  const { gameResult, setGameStarted } = useGame();
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    setGameStarted(false);
    navigate("/");
  };

  return (
    <div className="results-page">
      <div className="container">
        <h1>Mission Results</h1>

        <div className="result-card">
          {gameResult.captured ? (
            <>
              <div className="success-result">
                <h2>Success! The Fugitive Was Captured</h2>
                <div className="animation-container">
                  <div className="capture-animation"></div>
                </div>
              </div>
              <p className="hero-cop">
                Hero of the day: <strong>{gameResult.capturingCop}</strong>
              </p>
              <p>Location: {gameResult.fugitiveLocation.name}</p>
            </>
          ) : (
            <>
              <div className="failure-result">
                <h2>Mission Failed</h2>
                <div className="animation-container">
                  <div className="escape-animation"></div>
                </div>
              </div>
              <p>
                The fugitive was hiding in {gameResult.fugitiveLocation.name}
              </p>
              <p>None of our officers investigated this location.</p>
            </>
          )}
        </div>

        <button className="play-again-button" onClick={handlePlayAgain}>
          Start New Mission
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
