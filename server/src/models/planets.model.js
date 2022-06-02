const { parse } = require("csv-parse");
const fs = require("fs");

let results = [];
const isHabitPlanet = [];

function loadData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream("data/kepler_data.csv")
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabit(data)) {
          isHabitPlanet.push(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject();
      })
      .on("end", () => {
        console.log(`${isHabitPlanet.length} Habitable Planet found`);
        resolve();
      });
  });
}

function isHabit(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11
  );
}

function getAllPlanets() {
  return isHabitPlanet;
}

module.exports = {
  loadData,
  //  planets: isHabitPlanet,
  getAllPlanets,
};
