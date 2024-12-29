import { isNumber, isString } from "lodash-es";

const isStringNumber = (val: string): boolean => {
  if (!isString(val)) return false;
  return !Number.isNaN(Number(val));
};

export function addUnit(value: string | number, unit = "px"): string {
  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${unit}`;
  }
  if (isString(value)) {
    return value;
  }
  return "";
}
