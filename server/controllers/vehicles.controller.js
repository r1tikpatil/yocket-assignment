import { vehicles } from "../utils/constant.js";
import { sendResponse } from "../utils/utils.js";

export const getAllVehicles = (req, res) => {
  try {
    return sendResponse(res, {
      success: true,
      message: "Vehicles fetched successfully",
      data: vehicles,
    });
  } catch (error) {
    return sendResponse(
      res,
      {
        success: false,
        message: "Failed to fetch vehicles",
        data: null,
      },
      500
    );
  }
};

export const getVehicleById = (req, res) => {
  try {
    const vehicle = vehicles.find((v) => v.id === parseInt(req.params.id));
    if (!vehicle) {
      return sendResponse(
        res,
        {
          success: false,
          message: "Vehicle not found",
          data: null,
        },
        404
      );
    }

    return sendResponse(res, {
      success: true,
      message: "Vehicle fetched successfully",
      data: vehicle,
    });
  } catch (error) {
    return sendResponse(
      res,
      {
        success: false,
        message: "Failed to fetch vehicle",
        data: null,
      },
      500
    );
  }
};

export const createVehicle = (req, res) => {
  try {
    const { name, range, available } = req.body;

    if (!name || !range) {
      return sendResponse(
        res,
        {
          success: false,
          message: "Name and range are required",
          data: null,
        },
        400
      );
    }

    const newVehicle = {
      id: vehicles.length + 1,
      name,
      range,
      available: available ?? true,
    };

    vehicles.push(newVehicle);

    return sendResponse(
      res,
      {
        success: true,
        message: "Vehicle created successfully",
        data: newVehicle,
      },
      201
    );
  } catch (error) {
    return sendResponse(
      res,
      {
        success: false,
        message: "Failed to create vehicle",
        data: null,
      },
      500
    );
  }
};

export const updateVehicle = (req, res) => {
  try {
    const vehicle = vehicles.find((v) => v.id === parseInt(req.params.id));
    if (!vehicle) {
      return sendResponse(
        res,
        {
          success: false,
          message: "Vehicle not found",
          data: null,
        },
        404
      );
    }

    const { name, range, available } = req.body;
    vehicle.name = name || vehicle.name;
    vehicle.range = range || vehicle.range;
    vehicle.available = available !== undefined ? available : vehicle.available;

    return sendResponse(res, {
      success: true,
      message: "Vehicle updated successfully",
      data: vehicle,
    });
  } catch (error) {
    return sendResponse(
      res,
      {
        success: false,
        message: "Failed to update vehicle",
        data: null,
      },
      500
    );
  }
};

export const deleteVehicle = (req, res) => {
  try {
    const vehicleIndex = vehicles.findIndex(
      (v) => v.id === parseInt(req.params.id)
    );
    if (vehicleIndex === -1) {
      return sendResponse(
        res,
        {
          success: false,
          message: "Vehicle not found",
          data: null,
        },
        404
      );
    }

    const deletedVehicle = vehicles.splice(vehicleIndex, 1)[0];

    return sendResponse(res, {
      success: true,
      message: "Vehicle deleted successfully",
      data: deletedVehicle,
    });
  } catch (error) {
    return sendResponse(
      res,
      {
        success: false,
        message: "Failed to delete vehicle",
        data: null,
      },
      500
    );
  }
};
