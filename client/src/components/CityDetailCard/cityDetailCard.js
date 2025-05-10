import React from "react";

const CityDetailCard = ({
  city,
  usedCities,
  selectedCityId,
  handleCitySelect,
}) => {
  return (
    <div
      className={`city-card ${usedCities.includes(city.id) ? "disabled" : ""} ${
        selectedCityId === city.id ? "selected" : ""
      }`}
      onClick={() => !usedCities.includes(city.id) && handleCitySelect(city.id)}
    >
      <h3>{city.name}</h3>
      <p>{city.distance} KM from headquarters</p>
      {usedCities.includes(city.id) && (
        <div className="already-assigned">Already assigned</div>
      )}
    </div>
  );
};

export default CityDetailCard;
