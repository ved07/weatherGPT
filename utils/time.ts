function formatTime(date: Date, use24Hour: boolean = false): string {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let minuteString = minutes < 10 ? "0" + minutes : minutes.toString();

  if (use24Hour) {
    return `${hours}:${minuteString}`;
  } else {
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minuteString} ${ampm}`;
  }
}

export { formatTime };
