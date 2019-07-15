/**
 * A period in time.
 */
export interface Period {
  readonly startDate: Date;
  readonly endDate: Date;
}

export function merge (l: Period, r: Period) {
  let startDate = l.startDate < r.startDate ? l.startDate : r.startDate;
  let endDate = l.endDate > r.endDate ? l.endDate : r.endDate;

  return {
    startDate,
    endDate
  };
}
