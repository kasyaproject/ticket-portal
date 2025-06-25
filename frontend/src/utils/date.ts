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
  const month = String(date.month).padStart(2, "0"); // tambahkan leading zero
  const day = String(date.day).padStart(2, "0"); // tambahkan leading zero

  const hour = "hour" in date ? date.hour : 0;
  const minute = "minute" in date ? date.minute : 0;
  const second = "second" in date ? date.second : 0;

  const result = `${year}-${month}-${day} ${standartTime(hour)}:${standartTime(minute)}:${standartTime(second)}`;

  return result;
};

export const toInputDate = (date: string) => {
  const formattedDate = parseAbsoluteToLocal(`${date.replace(" ", "T")}+07:00`);

  return formattedDate;
};

export const convertTime = (isoDate: string) => {
  const dateObject = new Date(isoDate);

  const date = dateObject.toLocaleString("id-ID", {
    month: "short",
    day: "numeric",
    year: "numeric",

    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  });

  return `${date} WIB`;
};
