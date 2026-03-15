require("dotenv").config();
const express = require("express");
const cors = require("cors");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Weather server running");
});

app.get("/weather/:city", async (req, res) => {
  try {

    const city = req.params.city;
    const API_KEY = process.env.API_KEY;

    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);

  } catch (error) {

    console.log(error);
    res.status(500).json({ error: "Server error" });

  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});