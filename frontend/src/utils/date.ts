import { DateValue } from "@heroui/react";
import { parseAbsoluteToLocal } from "@internationalized/date";

const standartTime = (time: number) => {
  if (time < 10) {
    return `0${time}`;
  } else {
    return time;
  }
};

export const toDateStandard = (date: DateValue) => {
  const year = date.year;
  const month = date.month;
  const day = date.day;

  const hour = "hour" in date ? date.hour : 0;
  const minute = "minute" in date ? date.minute : 0;
  const second = "second" in date ? date.second : 0;

  const result = `${year}-${month}-${day} ${standartTime(hour)}:${standartTime(minute)}:${standartTime(second)}`;

  return result;
};

// export const toInputDate = (date: string) => {
//   const formattedDate = parseAbsoluteToLocal(`${date.replace(" ", "T")}+07:00`);
// };
