import { AssetEntry, ExpenseEntry, Entry, IncomeEntry } from '..';
import { List } from 'immutable';

export interface Simulation {
  readonly options: SimulationOptions;
  readonly behavior: SimulationBehavior;
  readonly input: SimulationInputs;
  readonly output: SimulationOptions;
}

export interface SimulationOptions {
  readonly simulationPeriod: Period;
}

export interface SimulationBehavior {
  readonly mergeResultFunction: (previousDate: Date | null, currentDate: Date) => boolean;
}

/**
 * When an Entry was triggered.
 */
export interface EntryApplication {
  readonly entry: Entry;
  readonly date: Date;
}

/**
 * A period in time.
 */
export interface Period {
  readonly startDate: Date;
  readonly endDate: Date;
}

export interface SimulationInputs {
  readonly income: List<IncomeEntry>;
  readonly expenses: List<ExpenseEntry>;
  readonly assets: List<AssetEntry>;
}

export interface SimulationResult {
  readonly incomePreTax: number;
  readonly incomePostTax: number;
  readonly expenses: number;
  readonly netWorth: number;
}

export interface SimulationOutputs {
  readonly period: Period;
  readonly entryApplications: List<EntryApplication>;
  readonly result: SimulationResult;
}
