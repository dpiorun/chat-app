export function getTime(date: Date) {
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  return `${hour}:${minute}`;
}
