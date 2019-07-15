import { AssetEntry, DebtEntry, SimulationEvent, ExpenseEvent, IncomeEvent } from '..';
import { List } from 'immutable';
import { Period } from '../period';
import { Heap } from 'typescript-collections';
import { EntryApplicationResult } from '../entry/simulationEvent';

export interface Simulation {
  readonly options: SimulationOptions;
  readonly entries: SimulationEntries;
}

/**
 * Options that control how a simulation is executed at the top-level.
 */
export interface SimulationOptions {
  readonly simulationPeriod: Period;
}

/**
 * An instance of an entry being applied.
 */
export interface EntryApplicationEvent {
  readonly entry: SimulationEvent;
  readonly date: Date;
}

/**
 * Entries which are used in a simulation.
 */
export interface SimulationEntries {
  readonly income: List<IncomeEvent>;
  readonly expenses: List<ExpenseEvent>;
  readonly assets: List<AssetEntry>;
  readonly debts: List<DebtEntry>;
}

export interface DatedEntryApplication {
  readonly date: Date;
  readonly result: EntryApplicationResult;
}

export function simulate (simulation: Simulation) {
  let heap = new Heap<EntryApplicationEvent>();
  let initialEntryApplications = List<EntryApplicationEvent>();
  let { entries, result } = simulation;
  let { startDate, endDate } = simulation.options.simulationPeriod;

  entries.income.forEach(entry => {
    let firstApplication = entry.applier.getNextDate(startDate);
    initialEntryApplications = initialEntryApplications.push({
      entry,
      date: firstApplication
    });
  });

  initialEntryApplications.forEach(entry => {
    heap.add(entry);
  });

  while (!heap.isEmpty()) {
    let top = heap.removeRoot() as EntryApplicationEvent;

    if (top.date > endDate) {
      break;
    }

    result = result.push({
      date: top.date,
      result: top.entry.getResult()
    });

    let nextApplication = top.entry.applier.getNextOccurrence(top.date);
    heap.add({
      entry: top.entry,
      date: nextApplication
    });
  }

  console.log(result);
}
