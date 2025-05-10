import express from "express";
import {
  startGame,
  getGameState,
  copSelection,
  getGameResult,
  getAvailableVehicles,
} from "../controllers/games.controller.js";

const router = express.Router();

router.post("/start", startGame);
router.get("/state", getGameState);
router.post("/cop-selection", copSelection);
router.get("/result", getGameResult);
router.get("/available-vehicles", getAvailableVehicles);

export default router;
