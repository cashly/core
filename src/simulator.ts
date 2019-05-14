import { calculateIncomeForDate, IncomeEntry } from './income';

export interface SimulationOptions {
  startDate: Date;
  endDate: Date;
}

export interface SimulationBehavior {
  simulationFunction: (date: Date, inputs: SimulationInputs) => SimulationResult;
  nextDateFunction: (currentDate: Date) => Date;
  mergeResultFunction: (previousDate: Date | null, currentDate: Date) => boolean;
}

export class SimulationResult {
  startDate: Date;
  endDate: Date;
  income: number;

  constructor (startDate: Date, endDate: Date, income: number) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.income = income;
  }

  merge (result: SimulationResult | null) {
    if (result !== null) {
      const startDate = this.startDate < result.startDate ? this.startDate : result.startDate;
      const endDate = this.endDate > result.endDate ? this.endDate : result.endDate;
      return new SimulationResult(startDate, endDate, this.income + result.income);
    } else {
      return result;
    }
  }

  static merge (l: SimulationResult | null, r: SimulationResult | null) {
    if (l !== null) {
      return l.merge(r);
    }
    return r;
  }
}

export interface SimulationInputs {
  income: IncomeEntry[];
}

export function runMonthlySimulation (options: SimulationOptions, data: SimulationInputs) {
  const functions = {
    simulationFunction: runSimulationForDate,
    nextDateFunction: (date: Date) => {
      let nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      return nextDate;
    },
    mergeResultFunction: (previousDate: Date | null, currentDate: Date) => {
      if (previousDate == null) {
        return false;
      }
      return previousDate.getMonth() === currentDate.getMonth();
    }
  };

  return runSimulation(options, data, functions);
}

/**
 * Uses a set of input functions to run a simulation on input data.
 * The simulationFunction maps a date to a SimulationResult.
 * The mergeResultFunction determines if the current simulation should be merged with the previous result.
 * The nextDateFunction returns the next date to simulate.
 */
export function runSimulation (options: SimulationOptions,
                               data: SimulationInputs,
                               functions: SimulationBehavior) {
  let startDate = options.startDate;
  let endDate = options.endDate;
  let previousDate: Date | null = null;
  let currentDate = startDate;

  let results: SimulationResult[] = [];

  while (currentDate <= endDate) {
    let result = functions.simulationFunction(currentDate, data);
    let shouldMerge = functions.mergeResultFunction(previousDate, currentDate);

    if (!shouldMerge || results.length === 0) {
      results = results.concat(result);
    } else {
      let prevResult = results[results.length - 1];
      results = results.slice(0, results.length - 1);
      results = results.concat(prevResult.merge(result) as SimulationResult);
    }

    let nextDate = functions.nextDateFunction(currentDate);
    previousDate = currentDate;
    currentDate = nextDate;
  }

  return results;
}

/**
 * Runs a simulation for a single date.
 */
export function runSimulationForDate (date: Date, data: SimulationInputs) {
  let income = calculateIncomeForDate(date, data.income);
  return new SimulationResult(date, date, income);
}
