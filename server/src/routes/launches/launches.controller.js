const {
  getAllLaunches,
  addNewLaunch,
  isLaunchExist,
  removeLaunchById,
} = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  try {
    return res.status(200).json(getAllLaunches());
  } catch (error) {
    console.log(error);
  }
}
function httpAddNewLaunch(req, res) {
  try {
    const launch = req.body;
    console.log(launch.mission);
    if (
      !launch.mission ||
      !launch.rocket ||
      !launch.launchDate ||
      !launch.destination
    ) {
      return res.status(400).json({
        error: "Missing Required Launch Property",
      });
    }
    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
      return res.status(400).json({
        error: "Invalid Launch Date",
      });
    }
    addNewLaunch(launch);
    return res.status(201).json(launch);
  } catch (error) {
    console.log(error);
  }
}

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);
  if (!isLaunchExist(launchId)) {
    return res.status(404).json({
      error: "Launch Not Found",
    });
  }

  let aborted = removeLaunchById(launchId);
  return res.status(200).json(aborted);
}

module.exports = { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };
