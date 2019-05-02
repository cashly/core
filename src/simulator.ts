import { calculateIncomeForDate, IncomeEntry } from './income';

export interface SimulationOptions {
  durationInMonths: number;
  startDate: Date;
}

export class SimulationResult {
  date: Date;
  income: number;

  constructor (date: Date, income: number) {
    this.date = date;
    this.income = income;
  }

  merge (result: SimulationResult) {
    return new SimulationResult(this.date, this.income + result.income);
  }
}

/**
 * Runs a simulation beginning from a specified date for a specified number of months.
 */
export function runSimulation (options: SimulationOptions, incomeEntries: IncomeEntry[]) {
  let date = options.startDate;
  let results: SimulationResult[] = [];

  for (let i = 0; i < options.durationInMonths; i++) {
    let result = runSimulationForMonth(date, incomeEntries);
    results = results.concat(result);

    date.setMonth(date.getMonth() + 1);
  }

  return results;
}

/**
 * Runs a simulation from a start date to the end of the month.
 */
export function runSimulationForMonth (startDate: Date, incomeEntries: IncomeEntry[]) {
  let date = startDate;
  let result = new SimulationResult(startDate, 0);

  while (date.getMonth() === result.date.getMonth()) {
    result = result.merge(runSimulationForDate(date, incomeEntries));
    date.setDate(startDate.getDate() + 1);
  }

  return result;
}

/**
 * Runs a simulation for a single date.
 */
export function runSimulationForDate (date: Date, incomeEntries: IncomeEntry[]) {
  return new SimulationResult(date, calculateIncomeForDate(date, incomeEntries));
}
