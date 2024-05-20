import { createContext, useCallback, useEffect, useState } from "react";

interface WeatherData {
  timestamps: Date[];
  rainfall: number[];
  temperature: number[];
}

const rainLow = 0;
const rainHigh = 100;
const tempLow = 0;
const tempHigh = 25;

const randInInterval = (lo:number, hi:number) => {
  return parseFloat((lo + Math.random()*(hi-lo)).toFixed(1));
}

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData>({
    timestamps: [],
    rainfall: [],
    temperature: []
  });
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(() => {
    const timestamps: Date[] = [];
    const rainfall: number[] = [];
    const temperature: number[] = [];

    const now = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    const timeEnd = endOfDay.getTime();
    
    for (let t = startOfDay.getTime(); t <= timeEnd; t += 60*60*1000) {
      let timestamp = new Date(now);
      timestamp.setTime(t);
      timestamps.push(timestamp);
      rainfall.push(randInInterval(rainLow,rainHigh));
      temperature.push(randInInterval(tempLow,tempHigh));
    }

    setWeather({
      timestamps,
      rainfall,
      temperature
    });
  }, [])

  useEffect(() => {
    refetch();
    setLoading(false);
  }, []);

  return {
    weather,
    loading,
    refetch
  }
}

export const defaultWeatherContext: WeatherDataContext = {
  weather: {
    timestamps: [],
    rainfall: [],
    temperature: []
  },
  loading: true,
  refetch: () => {}
}

export interface WeatherDataContext {
  weather: WeatherData;
  loading: boolean;
  refetch: () => void;
}

export const WeatherContext = createContext<WeatherDataContext | undefined>(undefined);
