import {Scheduler} from './scheduler';
import { setDate, setMonth } from 'date-fns'

export class MonthlyScheduler implements Scheduler {
    private readonly dayOfMonth: number;

    constructor(dayOfMonth: number) {
        this.dayOfMonth = dayOfMonth;
    }

    getNextDate(currentDate: Date) {
        if (this.isDateBeforeDayOfMonth(currentDate)) {
            return setDate(currentDate, this.dayOfMonth);
        } else {
            let currentMonth = currentDate.getMonth();
            let nextMonth = currentMonth + 1;
            return setDate(setMonth(currentDate, nextMonth), this.dayOfMonth);
        }
    }

    private isDateBeforeDayOfMonth(date: Date): boolean {
        return date.getDate() < this.dayOfMonth;
    }
}
