import { Entry } from './entry';

export interface AssetEntry extends Entry {
  readonly interestRate: number;
}
