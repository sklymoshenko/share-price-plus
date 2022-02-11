import { DateTime } from "luxon";

export const mainFormat = (date: string): string => {
  const dt = DateTime.fromISO(date);
  return dt.toLocaleString(DateTime.DATE_SHORT);
};
