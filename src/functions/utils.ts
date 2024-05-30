import { clsx } from "clsx";

export const getKeys = <T extends Object>(obj: T): Array<keyof T> =>
  Object.keys(obj) as Array<keyof T>;

export const getValues = <T extends Object>(obj: T): Array<T[keyof T]> =>
  Object.values(obj) as Array<T[keyof T]>;

export const cn = clsx;

export const nth = (d: number) => {
  const last = +String(d).slice(-2);
  if (last > 3 && last < 21) return "th";
  const remainder = last % 10;
  if (remainder === 1) return "st";
  if (remainder === 2) return "nd";
  if (remainder === 3) return "rd";
  return "th";
};

export const sum = (arr: number[]) => arr.reduce((acc, cur) => acc + cur, 0);
