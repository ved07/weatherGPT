import { useContext, useMemo } from "react";
import {
  WeatherContext,
  defaultWeatherContext,
  useWeather,
} from "./useWeather";
import {
  SettingsContext,
  defaultSettings,
  defaultSettingsContext,
  useSettings,
} from "./useSettings";

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
  };
}

const defaultPlan: Plan = {
  method: "cycle",
  toJourney: {
    startTime: new Date(),
    endTime: new Date(),
    rainfall: 0,
    temperature: 0,
  },
  backJourney: {
    startTime: new Date(),
    endTime: new Date(),
    rainfall: 0,
    temperature: 0,
  },
};

export const usePlanner = (): Plan => {
  const {
    weather: { timestamps, rainfall, temperature },
    loading: weatherLoading,
  } = useContext(WeatherContext) || defaultWeatherContext;
  const { settings } = useContext(SettingsContext) || defaultSettingsContext;

  const plan = useMemo(() => {
    const now = new Date();
    let startTime: Date;
    let endTime: Date;
    let cycleTime: number;

    if (settings.settingsTable !== undefined) {
      const settingToday = settings.settingsTable.find(
        (st) => st.day == (now.getDay() + 6) % 7
      );
      const st = settingToday!.startTime;
      startTime = new Date(now);
      startTime.setHours(
        st.getHours(),
        st.getMinutes(),
        st.getSeconds(),
        st.getMilliseconds()
      );

      const et = settingToday!.endTime;
      endTime = new Date(now);
      endTime.setHours(
        et.getHours(),
        et.getMinutes(),
        et.getSeconds(),
        et.getMilliseconds()
      );

      cycleTime = settingToday!.cycleTime;
    } else {
      startTime = new Date(now);
      startTime.setHours(8, 0, 0, 0);

      endTime = new Date(now);
      endTime.setHours(17, 0, 0, 0);

      cycleTime = 30;
    }

    const toTime = new Date(startTime.getTime() - cycleTime * 60 * 1000);
    const backTime = endTime;

    let toIndex = -1;
    let backIndex = timestamps.length;

    // Try to make toIndex and backIndex satisfy the constraints
    for (let index = 0; index < timestamps.length; index++) {
      if (
        rainfall[index] <= settings.rainfallTolerance &&
        temperature[index] >= settings.temperatureTolerance
      ) {
        let distToTime = toTime.getTime() - timestamps[index].getTime();
        let distBackTime = timestamps[index].getTime() - backTime.getTime();

        if (
          0 <= distToTime &&
          distToTime <= settings.maxWaitTime * 60 * 1000 &&
          index > toIndex
        ) {
          toIndex = index;
        }
        if (
          0 <= distBackTime &&
          distBackTime <= settings.maxWaitTime * 60 * 1000 &&
          index < backIndex
        ) {
          backIndex = index;
        }
      }
    }

    let latestToIndex = 0;
    if (toIndex == -1) {
      for (let index = 0; index < timestamps.length; index++) {
        if (timestamps[index] <= toTime && index > latestToIndex) {
          latestToIndex = index;
        }
      }
    }

    let earliestBackIndex = timestamps.length - 1;
    if (backIndex == timestamps.length) {
      for (let index = 0; index < timestamps.length; index++) {
        if (timestamps[index] >= backTime && index < earliestBackIndex) {
          earliestBackIndex = index;
        }
      }
    }

    if (toIndex === -1 || backIndex === timestamps.length) {
      const toJourney = {
        startTime: new Date(
          startTime.getTime() -
            cycleTime * settings.secondaryMultiplier * 60 * 1000
        ),
        endTime: startTime,
        rainfall: rainfall[latestToIndex],
        temperature: temperature[latestToIndex],
      };
      const backJourney = {
        startTime: endTime,
        endTime: new Date(
          endTime.getTime() +
            cycleTime * settings.secondaryMultiplier * 60 * 1000
        ),
        rainfall: rainfall[earliestBackIndex],
        temperature: temperature[earliestBackIndex],
      };

      return {
        method: settings.secondaryMethod,
        toJourney: toJourney,
        backJourney: backJourney,
      };
    }

    if (weatherLoading || !timestamps.length) return defaultPlan;

    const toJourney = {
      startTime: timestamps[toIndex],
      endTime: new Date(timestamps[toIndex].getTime() + cycleTime * 60 * 1000),
      rainfall: rainfall[toIndex],
      temperature: temperature[toIndex],
    };

    const backJourney = {
      startTime: timestamps[backIndex],
      endTime: new Date(
        timestamps[backIndex].getTime() + cycleTime * 60 * 1000
      ),
      rainfall: rainfall[backIndex],
      temperature: temperature[backIndex],
    };

    return {
      method: "cycle",
      toJourney: toJourney,
      backJourney: backJourney,
    };
  }, [timestamps, rainfall, temperature, JSON.stringify(settings)]);

  return plan;
};
