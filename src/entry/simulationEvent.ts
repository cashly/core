import { EventScheduler } from '../eventScheduler';

export interface SimulationEvent {
  readonly name: string;
  readonly applier: EventScheduler;
  readonly getResult: () => EntryApplicationResult;
}

/**
 * The result of an
 */
export interface EntryApplicationResult {
  incomePreTax: number;
  incomePostTax: number;
  expenses: number;
}

export interface EntryApplicationEvent {
  date: Date;
  entry: SimulationEvent;
}
