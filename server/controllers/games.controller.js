// Mock in-memory game state
import { cities, gameState } from "../utils/constant.js";
import { sendResponse } from "../utils/utils.js";

export const startGame = (req, res) => {
  try {
    const randomCityIndex = Math.floor(Math.random() * cities.length);

    gameState.fugitiveLocation = cities[randomCityIndex];
    gameState.copSelections = [];
    gameState.availableVehicles = [
      { id: 1, name: "EV Bike", range: 60, available: 2 },
      { id: 2, name: "EV Car", range: 100, available: 1 },
      { id: 3, name: "EV SUV", range: 120, available: 1 },
    ];
    gameState.gameResult = null;

    return sendResponse(
      res,
      {
        success: true,
        message: "Game started",
        data: { fugitiveLocationForTesting: gameState.fugitiveLocation },
      },
      201
    );
  } catch (error) {
    return sendResponse(
      res,
      {
        success: false,
        message: error.message,
      },
      500
    );
  }
};

export const getGameState = (req, res) => {
  try {
    const { fugitiveLocation, ...safeGameState } = gameState;

    return sendResponse(res, {
      success: true,
      message: "Game state fetched successfully",
      data: safeGameState,
    });
  } catch (error) {
    return sendResponse(
      res,
      {
        success: false,
        message: error.message,
      },
      500
    );
  }
};

export const copSelection = (req, res) => {
  try {
    const { copName, cityId, vehicleId } = req.body;

    if (!copName || !cityId || !vehicleId) {
      return sendResponse(
        res,
        {
          success: false,
          message: "Missing required fields",
        },
        400
      );
    }

    const existingCopIndex = gameState.copSelections.findIndex(
      (cop) => cop.copName === copName
    );
    if (existingCopIndex !== -1) {
      return sendResponse(
        res,
        {
          success: false,
          message: "This cop already made a selection",
        },
        400
      );
    }

    const cityAlreadySelected = gameState.copSelections.some(
      (cop) => cop.city.id === cityId
    );
    if (cityAlreadySelected) {
      return sendResponse(
        res,
        {
          success: false,
          message: "This city is already selected by another cop",
        },
        400
      );
    }

    const selectedCity = cities.find((c) => c.id === cityId);
    if (!selectedCity) {
      return sendResponse(
        res,
        {
          success: false,
          message: "City not found",
        },
        404
      );
    }

    const vehicleIndex = gameState.availableVehicles.findIndex(
      (v) => v.id === vehicleId
    );
    if (
      vehicleIndex === -1 ||
      gameState.availableVehicles[vehicleIndex].available <= 0
    ) {
      return sendResponse(
        res,
        {
          success: false,
          message: "Vehicle not available",
        },
        400
      );
    }

    const vehicleRange = gameState.availableVehicles[vehicleIndex].range;
    const roundTripDistance = selectedCity.distance * 2;

    if (vehicleRange < roundTripDistance) {
      return sendResponse(
        res,
        {
          success: false,
          message: "Vehicle does not have enough range for round trip",
          data: {
            required: roundTripDistance,
            available: vehicleRange,
          },
        },
        400
      );
    }

    // Update vehicle availability
    gameState.availableVehicles[vehicleIndex].available--;

    // Record cop selection
    gameState.copSelections.push({
      copName,
      city: selectedCity,
      vehicle: gameState.availableVehicles[vehicleIndex],
    });

    const foundFugitive = selectedCity.id === gameState.fugitiveLocation.id;

    if (gameState.copSelections.length === 3 || foundFugitive) {
      const capturingCop = foundFugitive ? copName : null;
      gameState.gameResult = {
        captured: foundFugitive,
        capturingCop: capturingCop,
        fugitiveLocation: gameState.fugitiveLocation,
      };
    }

    return sendResponse(res, {
      success: true,
      message: "Cop selection recorded",
      data: {
        foundFugitive,
        gameCompleted: gameState.gameResult !== null,
      },
    });
  } catch (error) {
    return sendResponse(
      res,
      {
        success: false,
        message: error.message,
      },
      500
    );
  }
};

export const getGameResult = (req, res) => {
  try {
    if (!gameState.gameResult) {
      return sendResponse(
        res,
        {
          success: false,
          message: "Game is not completed yet",
        },
        400
      );
    }

    return sendResponse(res, {
      success: true,
      message: "Game result fetched successfully",
      data: gameState.gameResult,
    });
  } catch (error) {
    return sendResponse(
      res,
      {
        success: false,
        message: error.message,
      },
      500
    );
  }
};

export const getAvailableVehicles = (req, res) => {
  try {
    return sendResponse(res, {
      success: true,
      message: "Available vehicles fetched successfully",
      data: gameState.availableVehicles,
    });
  } catch (error) {
    return sendResponse(
      res,
      {
        success: false,
        message: error.message,
      },
      500
    );
  }
};
