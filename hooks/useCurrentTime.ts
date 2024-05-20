
export const useCurrentTime = () => {
  // manually set to 13:00pm on today's date for testing
  return new Date(new Date().setHours(13, 0, 0, 0));
}
