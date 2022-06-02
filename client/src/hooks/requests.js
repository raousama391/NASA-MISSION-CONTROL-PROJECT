const axios = require("axios").default;
const API_BASE_URL = "http://localhost:8000";
async function httpGetPlanets() {
  try {
    let response = await axios.get(`${API_BASE_URL}/api/v1/planets`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

async function httpGetLaunches() {
  try {
    let response = await axios.get(`${API_BASE_URL}/api/v1/launches`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

async function httpSubmitLaunch(launch) {
  try {
    let response = await axios.post(`${API_BASE_URL}/api/v1/launches`, launch);
    console.log(launch);
    return response;
  } catch (e) {
    console.log(e);
  }
}

// Delete launch with given ID.
async function httpAbortLaunchClient(id) {
  try {
    let response = await axios.delete(`${API_BASE_URL}/api/v1/launches/${id}`);
    return response
  } catch (e) {
    return{
        ok:false
    }
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunchClient };
