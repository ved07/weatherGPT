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
    const now = new Date();
    let startTime: Date;
    let endTime: Date;
    let cycleTime: number;

    console.log(timestamps)
    console.log("settingsTable")
    console.log(settings.settingsTable)
    
    if (settings.settingsTable !== undefined) {
      const settingToday = settings.settingsTable.find((st) => st.day == (now.getDay() + 6) % 7);
      const st = settingToday!.startTime;
      startTime = new Date(now);
      startTime.setHours(st.getHours(), st.getMinutes(), st.getSeconds(), st.getMilliseconds())
      
      const et = settingToday!.endTime
      endTime = new Date(now);
      endTime.setHours(et.getHours(), et.getMinutes(), et.getSeconds(), et.getMilliseconds())
      
      // startTime = new Date(now.getTime() + settingToday.startTime.getTime());
      // endTime = new Date(now.getTime() + settingToday.endTime.getTime());
      cycleTime = settingToday!.cycleTime;
    }
    else {
      startTime = new Date(now);
      startTime.setHours(8,0,0,0);

      endTime = new Date(now);
      endTime.setHours(17,0,0,0);

      cycleTime = 30;
    }
    
    console.log(startTime)
    console.log(endTime)
    console.log(cycleTime)

    const toTime = new Date(startTime.getTime() - cycleTime * 60 * 1000);
    const backTime = endTime;

    let toIndex = -1;
    let backIndex = timestamps.length;

    // Try to make toIndex and backIndex satisfy the constraints
    for (let index = 0; index < timestamps.length; index++) {
      if(rainfall[index] <= settings.rainfallTolerance && temperature[index] >= settings.temperatureTolerance) {
        if (timestamps[index] <= toTime && index > toIndex) {
          toIndex = index;
        }
        if (timestamps[index] >= backTime && index < backIndex) {
          backIndex = index;
        }
      }
    }
    
    // Give the latest time possible if temp/rain constraints are impossible to satisfy
    if (toIndex == -1) {
      for (let index = 0; index < timestamps.length; index++) {
        if (timestamps[index] <= toTime && index > toIndex) {
          toIndex = index;
        }
      }
    }

    // Give the earliest time possible if temp/rain constraints are impossible to satisfy
    if (backIndex == timestamps.length) {
      for (let index = 0; index < timestamps.length; index++) {
        if (timestamps[index] >= backTime && index < backIndex) {
          backIndex = index;
        }
      }
    }

    if (toIndex == -1) toIndex = 0
    if (backIndex == timestamps.length) backIndex = timestamps.length-1

    console.log("toIndex: " + toIndex)
    console.log("backIndex: " + backIndex)

    if (weatherLoading || !timestamps.length) return defaultPlan;

    const toJourney = {
      startTime: timestamps[toIndex],
      endTime: new Date(timestamps[toIndex].getTime() + cycleTime*60*1000),
      rainfall: rainfall[toIndex],
      temperature: temperature[toIndex]
    }
    
    const backJourney = {
      startTime: timestamps[backIndex],
      endTime: new Date(timestamps[backIndex].getTime() + cycleTime*60*1000),
      rainfall: rainfall[backIndex],
      temperature: temperature[backIndex]
    }

    const method = (toJourney.rainfall <= settings.rainfallTolerance && toJourney.temperature >= settings.temperatureTolerance &&
      backJourney.rainfall <= settings.rainfallTolerance && backJourney.temperature >= settings.temperatureTolerance) ? "cycle" : "walk";
    
    return {
      method: method,
      toJourney: toJourney,
      backJourney: backJourney
    }
  }, [timestamps, rainfall, temperature, JSON.stringify(settings)])

  return plan
}

