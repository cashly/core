import { calculateIncomeForDate, IncomeEntry } from './income';

export interface SimulationOptions {
  durationInMonths: number;
  startDate: Date;
}

export interface SimulationData {
  income: number;
}

export function runSimulation (options: SimulationOptions, incomeEntries: IncomeEntry[]) {
  let date = options.startDate;

  for (let i = 0; i < options.durationInMonths; i++) {
    let data = runSimulationForMonth(date, incomeEntries);
    console.log(data);
    date.setMonth(date.getMonth() + 1);
  }

}

export function runSimulationForMonth (date: Date, incomeEntries: IncomeEntry[]): SimulationData {
  let month = date.getMonth();
  let incomeForMonth = 0;

  while (date.getMonth() === month) {
    incomeForMonth += calculateIncomeForDate(date, incomeEntries);
    date.setDate(date.getDate() + 1);
  }

  return {
    income: incomeForMonth
  };
}
