import {EventCreator} from './eventCreator';
import {IncomeEvent} from '../events/incomeEvent';

/**
 * Creates the same IncomeEvent every time
 */
export class ConstantIncomeEventCreator implements EventCreator<IncomeEvent> {
    private readonly name: string;
    private readonly amount: number;

    constructor (name: string, amount: number) {
        this.name = name;
        this.amount = amount;
    }

    create(date: Date) {
        return {
            name: this.name,
            amount: this.amount,
            date: date
        };
    }
}
