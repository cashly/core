import { EventFrequency } from './eventFrequency';

export class IncomeEntry {
  name: string;
  amount: number;
  startDate?: Date;
  frequency: EventFrequency;

  constructor (name: string, amount: number, frequency: EventFrequency) {
    this.name = name;
    this.amount = amount;
    this.frequency = frequency;
  }

  doesApply (date: Date): boolean {
    if (!this.startDate || date >= this.startDate) {
      return this.frequency.doesApply(date);
    } else {
      return false;
    }
  }
}

export function calculateIncomeForDate (date: Date, incomeEntries: IncomeEntry[]) {
  let incomeForMonth = 0;

  incomeEntries.forEach(entry => {
    if (entry.doesApply(date)) {
      incomeForMonth += entry.amount;
    }
  });

  return incomeForMonth;
}
