import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage/landingPage";
import VehicleSelection from "../pages/VehicleSelection/vehicleSelection";
import CitySelection from "../pages/CitySelection/citySelection";
import ResultsPage from "../pages/ResultsPage/ResultsPage";
import { useGame } from "../hooks/GameHook";

const RouteComponent = () => {
  const { gameStarted, gameCompleted } = useGame();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/city-selection"
        element={gameStarted ? <CitySelection /> : <Navigate to="/" />}
      />
      <Route
        path="/vehicle-selection"
        element={gameStarted ? <VehicleSelection /> : <Navigate to="/" />}
      />
      <Route
        path="/results"
        element={gameCompleted ? <ResultsPage /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default RouteComponent;
