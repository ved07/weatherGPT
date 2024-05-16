interface WeatherData {
  timestamps: Array<Date>;
  rainfall: Array<number>;
  temperature: Array<number>;
}

export const useWeather = () : WeatherData => {
  const rainLow = 0;
  const rainHigh = 100;
  const tempLow = 0;
  const tempHigh = 25;

  const randInInterval = (lo:number, hi:number) => {
    return lo + Math.random()*(hi-lo);
  }

  let timestamps = new Array<Date>();
  let rainfall = new Array<number>();
  let temperature = new Array<number>();

  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  let timeNow = now.getTime();
  const timeEnd = endOfDay.getTime();
  
  for (let timeNow = now.getTime(); timeNow <= timeEnd; timeNow += 1*60*1000) {
    let timestamp = now;
    timestamp.setTime(timeNow);
    
    rainfall.push(randInInterval(rainLow,rainHigh));
    temperature.push(randInInterval(tempLow,tempHigh));
  }

  return {
    timestamps : timestamps,
    rainfall: rainfall,
    temperature: temperature
  }
}
