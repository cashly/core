import {AccountEvent} from './accountEvent';
import {Account} from '../../account/account';

export class ExpenseEvent implements AccountEvent {
    readonly account: Account;
    readonly name: string;
    readonly amount: number;

    constructor(account: Account, name: string, amount: number) {
        this.account = account;
        this.name = name;
        this.amount = amount;
    }
}
