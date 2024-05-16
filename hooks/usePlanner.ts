import { useMemo } from "react";
import { useWeather } from "./useWeather";
import { useSettings } from "./useSettings";

export interface Plan {
  method: string;
  toJourney: {
    startTime: Date;
    endTime: Date;
    rainfall: number;
    temperature: number;
  };
  backJourney: {
    startTime: Date;
    endTime: Date;
    rainfall: number;
    temperature: number;
  }
}

export const usePlanner = (): Plan => {
  // fetch weather data
  let weatherData = useWeather();
  const {settings, loading, setSettings} = useSettings()

  let toIndex = 0;
  let backIndex = 1;

  let toJourney = {
    startTime: weatherData.timestamps[toIndex],
    endTime: weatherData.timestamps[toIndex],
    rainfall: weatherData.rainfall[toIndex],
    temperature: weatherData.temperature[toIndex]
  }
  
  let backJourney = {
    startTime: weatherData.timestamps[backIndex],
    endTime: weatherData.timestamps[backIndex],
    rainfall: weatherData.rainfall[backIndex],
    temperature: weatherData.temperature[backIndex]
  }

  let method = (toJourney.rainfall <= settings.rainfallTolerance && toJourney.temperature <= settings.temperatureTolerance &&
      backJourney.rainfall <= settings.rainfallTolerance && backJourney.temperature <= settings.temperatureTolerance) ? "cycle" : "walk";
  
  const plan = useMemo(() => {
    // do calculation
    return {
      // method: method.toString() + JSON.stringify(toJourney) + JSON.stringify(backJourney) + JSON.stringify(settings),
      method: method,
      toJourney: toJourney,
      backJourney: backJourney
    }
  }, [])

  return plan
}
