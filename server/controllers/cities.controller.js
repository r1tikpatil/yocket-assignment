import { cities } from "../utils/constant.js";
import { sendResponse } from "../utils/utils.js";

export const getAllCities = (req, res) => {
  try {
    return sendResponse(res, {
      success: true,
      message: "Cities fetched successfully",
      data: cities,
    });
  } catch (error) {
    return sendResponse(
      res,
      {
        success: false,
        message: "Failed to fetch cities",
        data: null,
      },
      500
    );
  }
};

export const getCityById = (req, res) => {
  try {
    const city = cities.find((c) => c.id === parseInt(req.params.id));
    if (!city) {
      return sendResponse(
        res,
        {
          success: false,
          message: "City not found",
          data: null,
        },
        404
      );
    }

    return sendResponse(res, {
      success: true,
      message: "City fetched successfully",
      data: city,
    });
  } catch (error) {
    return sendResponse(
      res,
      {
        success: false,
        message: "Failed to fetch city",
        data: null,
      },
      500
    );
  }
};

export const createCity = (req, res) => {
  try {
    const { name, distance } = req.body;

    if (!name || !distance) {
      return sendResponse(
        res,
        {
          success: false,
          message: "Name and distance are required",
          data: null,
        },
        400
      );
    }

    const newCity = {
      id: cities.length + 1,
      name,
      distance,
    };

    cities.push(newCity);

    return sendResponse(
      res,
      {
        success: true,
        message: "City created successfully",
        data: newCity,
      },
      201
    );
  } catch (error) {
    return sendResponse(
      res,
      {
        success: false,
        message: "Failed to create city",
        data: null,
      },
      500
    );
  }
};

export const updateCity = (req, res) => {
  try {
    const city = cities.find((c) => c.id === parseInt(req.params.id));
    if (!city) {
      return sendResponse(
        res,
        {
          success: false,
          message: "City not found",
          data: null,
        },
        404
      );
    }

    const { name, distance } = req.body;
    city.name = name || city.name;
    city.distance = distance || city.distance;

    return sendResponse(res, {
      success: true,
      message: "City updated successfully",
      data: city,
    });
  } catch (error) {
    return sendResponse(
      res,
      {
        success: false,
        message: "Failed to update city",
        data: null,
      },
      500
    );
  }
};

export const deleteCity = (req, res) => {
  try {
    const cityIndex = cities.findIndex((c) => c.id === parseInt(req.params.id));
    if (cityIndex === -1) {
      return sendResponse(
        res,
        {
          success: false,
          message: "City not found",
          data: null,
        },
        404
      );
    }

    const deletedCity = cities.splice(cityIndex, 1)[0];

    return sendResponse(res, {
      success: true,
      message: "City deleted successfully",
      data: deletedCity,
    });
  } catch (error) {
    return sendResponse(
      res,
      {
        success: false,
        message: "Failed to delete city",
        data: null,
      },
      500
    );
  }
};
