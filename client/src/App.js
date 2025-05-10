import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { GameProvider } from "./context/GameContext";
import RouteComponent from "./routes/routes";

const App = () => {
  return (
    <GameProvider>
      <Router>
        <div className="App">
          <RouteComponent />
        </div>
      </Router>
    </GameProvider>
  );
};

export default App;
