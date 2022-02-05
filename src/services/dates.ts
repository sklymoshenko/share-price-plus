import { DateTime } from "luxon";

export const mainFormat = (date: string): string => {
  debugger;
  const dt = DateTime.fromISO(date);
  debugger;
  return dt.toLocaleString(DateTime.DATETIME_SHORT);
};
