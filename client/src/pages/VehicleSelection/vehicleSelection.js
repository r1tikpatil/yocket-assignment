import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import VehicleDetailCard from "../../components/VehicleDetailCard/vehicleDetail";
import { useGame } from "../../hooks/GameHook";
import { copsData } from "../../utils/utils";

const VehicleSelection = () => {
  const {
    currentCopIndex,
    setCurrentCopIndex,
    cops,
    setCops,
    cities,
    availableVehicles,
    setAvailableVehicles,
    setGameCompleted,
    setGameResult,
  } = useGame();

  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchAvailableVehicles = async () => {
      try {
        const response = await api.get("/game/available-vehicles");
        setAvailableVehicles(response.data.data);

        // Find the selected city
        const cityId = cops[currentCopIndex].cityId;
        const city = cities.data.find((c) => c.id === cityId);
        setSelectedCity(city);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setError("Failed to load available vehicles");
        setLoading(false);
      }
    };

    fetchAvailableVehicles();
  }, [currentCopIndex, cops, cities, setAvailableVehicles]);

  const handleVehicleSelect = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
  };

  const isVehicleAvailable = (vehicle) => {
    return vehicle.available > 0;
  };

  const hasEnoughRange = (vehicle) => {
    if (!selectedCity) return false;
    return vehicle.range >= selectedCity.distance * 2;
  };

  const handleContinue = async () => {
    if (!selectedVehicleId) {
      alert("Please select a vehicle");
      return;
    }

    try {
      // Update cop's selected vehicle
      const updatedCops = [...cops];
      updatedCops[currentCopIndex] = {
        ...updatedCops[currentCopIndex],
        vehicleId: selectedVehicleId,
      };

      // Send selection to backend
      const response = await api.post("/game/cop-selection", {
        copName: cops[currentCopIndex].name,
        cityId: cops[currentCopIndex].cityId,
        vehicleId: selectedVehicleId,
      });

      setCops(copsData);

      // Check if game updatedCopsis completed
      if (response.data.data.gameCompleted) {
        // Fetch final game result
        const resultResponse = await api.get("/game/result");
        setGameResult(resultResponse.data.data);
        setGameCompleted(true);
        navigate("/results");
      } else if (currentCopIndex < 2) {
        // Move to next cop
        setCurrentCopIndex(currentCopIndex + 1);
        navigate("/city-selection");
      }
    } catch (err) {
      console.error("Error submitting selection:", err);
      if (err.response && err.response.data && err.response.data.message) {
        alert(`Error: ${err.response.data.message}`);
      } else {
        alert("Failed to submit your selection. Please try again.");
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="vehicle-selection">
      <div className="container">
        <h1>Select a Vehicle</h1>
        <div className="cop-info">
          <h2>{cops && cops[currentCopIndex].name}</h2>
          <p>
            Selected city: {selectedCity ? selectedCity.name : "Unknown"} (
            {selectedCity ? selectedCity.distance : 0} KM)
          </p>
          <p>
            Required range for round trip:{" "}
            {selectedCity ? selectedCity.distance * 2 : 0} KM
          </p>
        </div>

        <div className="vehicles-grid">
          {availableVehicles &&
            availableVehicles.map((vehicle) => {
              const available = isVehicleAvailable(vehicle);
              const enoughRange = hasEnoughRange(vehicle);

              return (
                <VehicleDetailCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  available={available}
                  enoughRange={enoughRange}
                  selectedVehicleId={selectedVehicleId}
                  handleVehicleSelect={handleVehicleSelect}
                />
              );
            })}
        </div>

        <button
          className="continue-button"
          disabled={!selectedVehicleId}
          onClick={handleContinue}
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
};

export default VehicleSelection;
