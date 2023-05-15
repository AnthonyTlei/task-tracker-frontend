import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function getUserTimezone() {
  const storedTimezone = localStorage.getItem("userTimezone");

  if (storedTimezone) {
    return storedTimezone;
  } else {
    const guessedTimezone = dayjs.tz.guess();
    localStorage.setItem("userTimezone", guessedTimezone);
    return guessedTimezone;
  }
}

export function formatDate(date: Date) {
  const server_timezone = "Etc/UTC";
  const local_timezone = getUserTimezone();
  const date_formatted = date
    ? dayjs(date).tz(server_timezone).tz(local_timezone).format("MM/DD/YYYY")
    : "";
  return date_formatted;
}

export function convertToServerTime(date: Date) {
  const server_timezone = "Etc/UTC";
  const local_timezone = getUserTimezone();
  const date_formatted = date
    ? dayjs(date).tz(local_timezone).tz(server_timezone).format("MM/DD/YYYY")
    : date;
  return new Date(date_formatted);
}
