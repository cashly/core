export interface JsonBill {
  amount: number;
  date: JsonDate;
}

export interface JsonDate {
  day: number;
  month: number;
  year: number;
}

export function isJsonDate(value: unknown): value is JsonDate {
  const castedValue = value as JsonDate;
  const day: unknown = castedValue.day;
  const month: unknown = castedValue.month;
  const year: unknown = castedValue.year;
  return typeof day === "number" && typeof month === "number" && typeof year === "number";
}

export function isJsonBill(value: unknown): value is JsonBill {
  const castedValue = value as JsonBill;
  return castedValue.amount !== undefined && isJsonDate(castedValue.date);
}
