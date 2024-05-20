export const useCurrentTime = () => {
  // manually set to 13:00pm on today's date for testing
  return new Date();
};

export const getDayOfWeek = (date: Date): number => {
  return (date.getDay() + 6) % 7;
};
