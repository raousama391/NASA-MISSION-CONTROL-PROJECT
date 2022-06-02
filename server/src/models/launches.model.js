const launches = new Map();

let latestFlightNumber = 100;
const launch = {
  flightNumber: 100,
  mission: "kepler Exploration X",
  rocket: "Explorer",
  launchDate: new Date("December 20, 2030"),
  destination: "Kepler-422-B",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      upcoming: true,
      success: true,
      customers: ["raousama391", "NASA"],
    })
  );
}

function isLaunchExist(id) {
  let launchArr = Array.from(launches.values());
  let LaunchExist = launchArr.filter((x) => {
    x.flightNumber == id;
  });
  return LaunchExist;
}

function removeLaunchById(launchId) {
  let abortedArr = Array.from(launches.values());
  let abort = abortedArr.map((x) => {
    if (x.flightNumber === launchId) {
      x.upcoming = false;
      x.success = false;
    }
  });
  return abort;
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  isLaunchExist,
  removeLaunchById,
};
