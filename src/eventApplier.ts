import { addMonths, endOfMonth, isLastDayOfMonth, lastDayOfMonth, setDate } from 'date-fns';

export interface EventApplier {
  getNextApplication: (currentDate: Date) => Date;
}

export class MonthlyEventApplier implements EventApplier {
  readonly date: Date;

  constructor (date: Date) {
    this.date = date;
  }

  getNextApplication (currentDate: Date) {
    if (currentDate.getDate() < this.date.getDate()) {
      return setDate(currentDate, this.date.getDate());
    } else {
      return addMonths(setDate(currentDate, this.date.getDate()), 1);
    }
  }

}

export class LastDayOfMonthApplier implements EventApplier {
  getNextApplication (currentDate: Date) {
    if (isLastDayOfMonth(currentDate)) {
      return lastDayOfMonth(addMonths(currentDate, 1));
    } else {
      return endOfMonth(currentDate);
    }
  };
}
