import { useContext, useMemo } from "react";
import { WeatherContext, defaultWeatherContext, useWeather } from "./useWeather";
import { SettingsContext, defaultSettings, defaultSettingsContext, useSettings } from "./useSettings";

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

const defaultPlan: Plan = {
  method: "walk",
  toJourney: {
    startTime: new Date(),
    endTime: new Date(),
    rainfall: 0,
    temperature: 0
  },
  backJourney: {
    startTime: new Date(),
    endTime: new Date(),
    rainfall: 0,
    temperature: 0
  }
}

export const usePlanner = (): Plan => {
  const {
    weather: {
      timestamps,
      rainfall,
      temperature
    },
    loading: weatherLoading,
  } = useContext(WeatherContext) || defaultWeatherContext;
  const { settings } = useContext(SettingsContext) || defaultSettingsContext;
  
  const plan = useMemo(() => {
    const toIndex = 8;
    const backIndex = 17;

    if (weatherLoading || !timestamps.length) return defaultPlan;

    const toJourney = {
      startTime: timestamps[toIndex],
      endTime: new Date(timestamps[toIndex].getTime() + 30*60*1000),
      rainfall: rainfall[toIndex],
      temperature: temperature[toIndex]
    }
    
    const backJourney = {
      startTime: timestamps[backIndex],
      endTime: new Date(timestamps[backIndex].getTime() + 30*60*1000),
      rainfall: rainfall[backIndex],
      temperature: temperature[backIndex]
    }

    const method = (toJourney.rainfall <= settings.rainfallTolerance && toJourney.temperature >= settings.temperatureTolerance &&
      backJourney.rainfall <= settings.rainfallTolerance && backJourney.temperature >= settings.temperatureTolerance) ? "cycle" : "walk";
    
    console.log(method)

    return {
      method: method,
      toJourney: toJourney,
      backJourney: backJourney
    }
  }, [timestamps, rainfall, temperature, JSON.stringify(settings)])

  return plan
}
