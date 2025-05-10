import React from "react";

const VehicleDetailCard = ({
  vehicle,
  available,
  enoughRange,
  selectedVehicleId,
  handleVehicleSelect,
}) => {
  return (
    <div
      className={`vehicle-card 
${!available || !enoughRange ? "disabled" : ""} 
${selectedVehicleId === vehicle.id ? "selected" : ""}
`}
      onClick={() =>
        available && enoughRange && handleVehicleSelect(vehicle.id)
      }
    >
      <h3>{vehicle.name}</h3>
      <p>Range: {vehicle.range} KM</p>
      <p>Available: {vehicle.available}</p>

      {!available && <div className="unavailable">No vehicles available</div>}
      {available && !enoughRange && (
        <div className="insufficient-range">
          Insufficient range for round trip
        </div>
      )}
    </div>
  );
};

export default VehicleDetailCard;
