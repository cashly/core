import { SimulationEvent } from './simulationEvent';
import { EventScheduler } from '../eventScheduler';

export class ExpenseEvent implements SimulationEvent {
  readonly name: string;
  readonly amount: number;
  readonly applier: EventScheduler;

  constructor (name: string, amount: number, applier: EventScheduler) {
    this.name = name;
    this.amount = amount;
    this.applier = applier;
  }

  getResult () {
    return {
      incomePreTax: 0,
      incomePostTax: 0,
      expenses: this.amount
    };
  }

}
