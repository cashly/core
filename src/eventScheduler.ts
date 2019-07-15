import { addMonths, endOfMonth, isLastDayOfMonth, lastDayOfMonth, setDate } from 'date-fns';

/**
 * Determines when an Event should take place.
 */
export interface EventScheduler {
  getNextOccurrence: (currentDate: Date) => Date;
}

export class MonthlyEventApplier implements EventScheduler {
  readonly date: Date;

  constructor (date: Date) {
    this.date = date;
  }

  getNextOccurrence (currentDate: Date) {
    if (currentDate.getDate() < this.date.getDate()) {
      return setDate(currentDate, this.date.getDate());
    } else {
      return addMonths(setDate(currentDate, this.date.getDate()), 1);
    }
  }
}

export class LastDayOfMonthApplier implements EventScheduler {
  getNextOccurrence (currentDate: Date) {
    if (isLastDayOfMonth(currentDate)) {
      return lastDayOfMonth(addMonths(currentDate, 1));
    } else {
      return endOfMonth(currentDate);
    }
  }
}
