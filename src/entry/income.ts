import { Entry } from './entry';

export interface IncomeEntry extends Entry {
  readonly taxRate: number;
}
