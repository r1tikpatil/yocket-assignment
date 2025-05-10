const express = require("express");
const router = express.Router();
const {
  getAllCities,
  getCityById,
  createCity,
  updateCity,
  deleteCity,
} = require("../controllers/cities.controller");

router.get("/cities", getAllCities);
router.get("/cities/:id", getCityById);
router.post("/cities", createCity);
router.put("/cities/:id", updateCity);
router.delete("/cities/:id", deleteCity);

module.exports = router;
