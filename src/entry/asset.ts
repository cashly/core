import { SimulationEvent, EntryApplicationResult } from './simulationEvent';
import { EventScheduler } from '../eventScheduler';

export class AssetEntry implements SimulationEvent {
  readonly name: string;
  readonly amount: number;
  readonly applier: EventScheduler;
  readonly taxRate: number;

  constructor (name: string, amount: number, applier: EventScheduler, taxRate: number) {
    this.name = name;
    this.amount = amount;
    this.applier = applier;
    this.taxRate = taxRate;
  }

  getResult () {
    return {
      incomePreTax: this.amount,
      incomePostTax: this.amount * (1 - this.taxRate),
      expenses: 0
    };
  }

}
