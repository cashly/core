import {Event} from './event';

export class IncomeEvent implements Event {
    readonly name: string;
    readonly date: Date;
    readonly amount: number;

    constructor(name: string, date: Date, amount: number) {
        this.name = name;
        this.date = date;
        this.amount = amount;
    }
}
