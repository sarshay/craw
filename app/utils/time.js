import dayjs from "dayjs";

export function ago(dateTime) {
  const now = dayjs();
  const targetTime = dayjs(dateTime);

  const diffInMinutes = now.diff(targetTime, "minutes");
  const diffInHours = now.diff(targetTime, "hours");
  const diffInDays = now.diff(targetTime, "days");
  const diffInYears = now.diff(targetTime, "years");

  if (diffInMinutes < 1) {
    return "just now";
  } else if (diffInHours < 1) {
    return `${diffInMinutes} min`;
  } else if (diffInDays < 1) {
    return `${diffInHours} hr`;
  } else if (diffInDays === 1) {
    return "1 day";
  } else if (diffInYears < 1) {
    return `${diffInDays} day`;
  } else if (diffInYears === 1) {
    return "1 year";
  } else {
    return `${diffInYears} years`;
  }
}
