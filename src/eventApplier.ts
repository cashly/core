/**
 * Determines whether or not an event applies to a given date.
 */
export interface EventApplier {
  doesApply: (date: Date) => boolean;
}

/**
 * An event that occurs every date on the same day.
 */
export class MonthlyEvent implements EventApplier {
  date: Date;

  constructor (date: Date) {
    this.date = date;
  }

  doesApply (date: Date): boolean {
    return this.date <= date &&
        this.date.getDate() === date.getDate();
  }
}

/**
 * An event that occurs every year on the same day.
 */
export class YearlyEvent implements EventApplier {
  date: Date;

  constructor (date: Date) {
    this.date = date;
  }

  doesApply (date: Date): boolean {
    return this.date <= date &&
        this.date.getMonth() === date.getMonth() &&
        this.date.getDate() === date.getDate();
  }
}
