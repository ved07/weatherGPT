import { useMemo } from "react";

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

  const plan = useMemo(() => {
    // do calculation
    return {
      method: "cycle",
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
  }, [])

  return plan
}
