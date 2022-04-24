import { formatDuration, intervalToDuration } from "date-fns";

const formattedTime = (time) => {
  return formatDuration(intervalToDuration({ start: 0, end: time * 1000 }));
};

export default formattedTime;
