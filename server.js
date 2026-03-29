const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// 🔥 Data store
let data = {
  count: 0,
  tempIn: 25,
  tempOut: 30,
  lat: 0,
  lon: 0,
  door: "CLOSED",
  lastUpdated: new Date()
};

// 🔥 ESP32 sends data here
app.get("/update", (req, res) => {
  if (req.query.count) data.count = parseInt(req.query.count);
  if (req.query.tempIn) data.tempIn = parseFloat(req.query.tempIn);
  if (req.query.tempOut) data.tempOut = parseFloat(req.query.tempOut);

  if (req.query.lat) data.lat = parseFloat(req.query.lat);
  if (req.query.lon) data.lon = parseFloat(req.query.lon);
  if (req.query.door) data.door = req.query.door;

  data.lastUpdated = new Date();

  console.log("📡 Updated:", data);

  res.send("OK");
});

// 🔥 Send data to website
app.get("/data", (req, res) => {
  res.json(data);
});

// 🔁 Reset
app.get("/reset", (req, res) => {
  data = {
    count: 0,
    tempIn: 25,
    tempOut: 30,
    lat: 0,
    lon: 0,
    door: "CLOSED",
    lastUpdated: new Date()
  };
  res.send("Reset Done");
});

// 🔥 PORT (for Render)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});