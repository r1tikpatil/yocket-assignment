import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

import cityRoutes from "./routes/cities.route.js";
import vehicleRoutes from "./routes/vehicles.route.js";
import gameRoutes from "./routes/games.route.js";

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

app.get("/health", (req, res) => {
  return res.status(200).json({ message: "Server is up!" });
});

app.use("/api/cities", cityRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/game", gameRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
