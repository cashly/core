import { Entry } from './entry';

export interface DebtEntry extends Entry {
  readonly name: string;
  readonly amount: number;
  readonly interestRate: number;
  readonly minimumPayment: number;
}
