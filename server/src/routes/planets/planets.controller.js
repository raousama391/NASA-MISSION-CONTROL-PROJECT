const { getAllPlanets } = require("../../models/planets.model");

module.exports ={
    httpGetAllPlanets: function (req, resp) {
  try {
    return resp?.status(200).json(getAllPlanets());
  } catch (error) {
    console.log(error);
  }
}
}
