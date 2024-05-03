import { clsx } from "clsx";

export const getKeys = <T extends Object>(obj: T): Array<keyof T> =>
  Object.keys(obj) as Array<keyof T>;

export const getValues = <T extends Object>(obj: T): Array<T[keyof T]> =>
  Object.values(obj) as Array<T[keyof T]>;

export const cn = clsx;
