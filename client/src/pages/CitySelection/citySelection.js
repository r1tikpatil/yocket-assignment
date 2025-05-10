import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CityDetailCard from "../../components/CityDetailCard/cityDetailCard";
import { useGame } from "../../hooks/GameHook";

const CitySelection = () => {
  const { currentCopIndex, cops, setCops, cities } = useGame();
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [usedCities, setUsedCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get cities already selected by previous cops
    const usedCityIds = cops
      ?.filter((cop) => cop.cityId !== null)
      ?.map((cop) => cop.cityId);

    setUsedCities(usedCityIds ?? []);
  }, [cops]);

  const handleCitySelect = (cityId) => {
    setSelectedCityId(cityId);
  };

  const handleContinue = () => {
    if (!selectedCityId) {
      alert("Please select a city to investigate");
      return;
    }

    // Update cop's selected city
    const updatedCops = cops ? [...cops] : [];
    updatedCops[currentCopIndex] = {
      ...updatedCops[currentCopIndex],
      cityId: selectedCityId,
    };
    setCops(updatedCops);
    navigate("/vehicle-selection");
  };

  return (
    <div className="city-selection">
      <div className="container">
        <h1>Select a City to Investigate</h1>
        <div className="cop-info">
          <h2>{cops && cops[currentCopIndex].name}</h2>
          <p>Choose which city you want to investigate</p>
        </div>

        <div className="cities-grid">
          {cities &&
            cities.data.map((city) => (
              <CityDetailCard
                key={city.id}
                usedCities={usedCities}
                city={city}
                selectedCityId={selectedCityId}
                handleCitySelect={handleCitySelect}
              />
            ))}
        </div>

        <button
          className="continue-button"
          disabled={!selectedCityId}
          onClick={handleContinue}
        >
          Continue to Vehicle Selection
        </button>
      </div>
    </div>
  );
};

export default CitySelection;
