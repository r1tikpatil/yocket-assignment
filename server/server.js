// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cityRoutes = require("./routes/cities.route");

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/api", cityRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
