export interface EventFrequency {
  doesApply: (date: Date) => boolean;
}

/**
 * An event that occurs every month on the same day.
 */
export class MonthlyEvent implements EventFrequency {
  date: Date;

  constructor (date: Date) {
    this.date = date;
  }

  doesApply (date: Date): boolean {
    return this.date.getDay() === date.getDay();
  }
}

/**
 * An event that occurs every year on the same day.
 */
export class YearlyEvent implements EventFrequency {
  date: Date;

  constructor (date: Date) {
    this.date = date;
  }

  doesApply (date: Date): boolean {
    return this.date.getMonth() === date.getMonth() &&
        this.date.getDay() === date.getDay();
  }
}
