import { isLastDayOfMonth } from 'date-fns';

/**
 * Determines whether or not an event applies to a given startDate.
 */
export interface EventApplierLegacy {
  doesApply: (date: Date) => boolean;
}

/**
 * An event that occurs every date on the same day.
 */
export class MonthlyEvent implements EventApplierLegacy {
  date: Date;

  constructor (date: Date) {
    this.date = date;
  }

  doesApply (date: Date) {
    return this.date <= date &&
        this.date.getDate() === date.getDate();
  }
}

/**
 * An event that occurs every year on the same day.
 */
export class YearlyEvent implements EventApplierLegacy {
  date: Date;

  constructor (date: Date) {
    this.date = date;
  }

  doesApply (date: Date) {
    return this.date <= date &&
        this.date.getMonth() === date.getMonth() &&
        this.date.getDate() === date.getDate();
  }
}

/**
 * An event that occurs once on a certain day.
 */
export class OneOffEvent implements EventApplierLegacy {
  date: Date;

  constructor (date: Date) {
    this.date = date;
  }

  doesApply (date: Date) {
    console.log(this.date + ' ' + date);
    return this.date.getFullYear() === date.getFullYear() &&
        this.date.getMonth() === date.getMonth() &&
        this.date.getDate() === date.getDate();
  }
}

export class EndOfMonthEvent implements EventApplierLegacy {
  date: Date;

  constructor (date: Date) {
    this.date = date;
  }

  doesApply (date: Date) {
    return date >= this.date && isLastDayOfMonth(date);
  }
}
