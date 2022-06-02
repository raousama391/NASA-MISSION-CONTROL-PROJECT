const express = require("express");
const cors = require("cors");
var morgan = require("morgan");
const path = require("path");
const app = express();
const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
//app.use(morgan("combined"));

const buildUrl = (version, path) => `/api/${version}/${path}`;


const PLANETS_BASE_URL = buildUrl("v1", "planets");
const LAUNCHES_BASE_URL = buildUrl("v1", "launches");

app.use(PLANETS_BASE_URL, planetsRouter);
app.use(LAUNCHES_BASE_URL, launchesRouter);

app.use(express.static(path.join(__dirname, "..", "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
