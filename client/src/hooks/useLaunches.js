import { useCallback, useEffect, useState } from "react";

import {
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunchClient,
} from "./requests";

function useLaunches(onSuccessSound, onAbortSound, onFailureSound) {
  const [launches, saveLaunches] = useState([]);
  const [isPendingLaunch, setPendingLaunch] = useState(false);

  const getLaunches = useCallback(async () => {
    const fetchedLaunches = await httpGetLaunches();
    saveLaunches(fetchedLaunches);
  }, []);

  useEffect(() => {
    getLaunches();
  }, [getLaunches]);

  const submitLaunch = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        setPendingLaunch(true);
        const data = new FormData(e.target);
        const launchDate = new Date(data.get("launch-day"));
        const mission = data.get("mission-name");
        const rocket = data.get("rocket-name");
        const destination = data.get("planets-selector");
        const response = await httpSubmitLaunch({
          launchDate,
          mission,
          rocket,
          destination,
        });

        // TODO: Set success based on response.
        const success = response.data;
        if (success) {
          getLaunches();
          setTimeout(() => {
            setPendingLaunch(false);
            onSuccessSound();
          }, 800);
        } else {
          onFailureSound();
        }
      } catch (e) {
        alert('Please Check your Inputs')
        console.log(e);
      }
    },
    [getLaunches, onSuccessSound, onFailureSound]
  );

  const abortLaunch = useCallback(
    async (id) => {
      const response = await httpAbortLaunchClient(id);

      // TODO: Set success based on response.
      const success = response.data;
      if (success) {
        getLaunches();
        onAbortSound();
        httpGetLaunches();
      } else {
        onFailureSound();
      }
    },
    [getLaunches, onAbortSound, onFailureSound]
  );

  return {
    launches,
    isPendingLaunch,
    submitLaunch,
    abortLaunch,
  };
}

export default useLaunches;
