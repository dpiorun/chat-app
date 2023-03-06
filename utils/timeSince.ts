const timeInSeconds = {
  year: 31536000,
  month: 2592000,
  day: 86400,
  hour: 3600,
  min: 60,
};

export function timeSince(date: string) {
  const seconds = Math.floor(
    (new Date().valueOf() - new Date(date).valueOf()) / 1000
  );

  for (const [key, value] of Object.entries(timeInSeconds)) {
    const interval = Math.floor(seconds / value);
    if (interval == 1) {
      return `${interval} ${key}`;
    } else if (interval > 1) {
      if (key == "min") {
        return `${interval} ${key}`;
      }
      return `${interval} ${key}s`;
    }
  }
  return "Just now";
}
