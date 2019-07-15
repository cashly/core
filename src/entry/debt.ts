import { SimulationEvent } from './simulationEvent';
import { EventScheduler } from '../eventScheduler';

export class DebtEntry implements SimulationEvent {
  readonly name: string;
  readonly amount: number;
  readonly interestRate: number;
  readonly minimumPayment: number;
  readonly applier: EventScheduler;

  constructor (name: string, amount: number, interestRate: number, minimumPayment: number, applier: EventScheduler) {
    this.name = name;
    this.amount = amount;
    this.interestRate = interestRate;
    this.minimumPayment = minimumPayment;
    this.applier = applier;
  }

  getResult () {
    return {
      incomePreTax: 0,
      incomePostTax: 0,
      expenses: this.minimumPayment
    };
  }
}
