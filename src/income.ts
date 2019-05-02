import { EventApplier } from './eventApplier';

export class IncomeEntry {
  name: string;
  amount: number;
  frequency: EventApplier;

  constructor (name: string, amount: number, frequency: EventApplier) {
    this.name = name;
    this.amount = amount;
    this.frequency = frequency;
  }

  doesApply (date: Date): boolean {
    return this.frequency.doesApply(date);
  }
}

export function calculateIncomeForDate (date: Date, incomeEntries: IncomeEntry[]) {
  let income = 0;

  incomeEntries.forEach(entry => {
    if (entry.doesApply(date)) {
      income += entry.amount;
    }
  });

  return income;
}
