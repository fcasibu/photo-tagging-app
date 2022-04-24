import { formatDuration, intervalToDuration, format } from "date-fns";

const formattedTime = (time) => {
  return formatDuration(intervalToDuration({ start: 0, end: time * 1000 }));
};

const digitalFormat = (time) => {
  const digitalTime = format(new Date(time * 1000), "mm:ss");
  return digitalTime;
};

export { formattedTime, digitalFormat };
