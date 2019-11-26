import {Account} from '../account/account';
import {StringAccountIdentifier} from '../account/stringAccountIdentifier';
import {EventScheduler} from '../event/scheduler/eventScheduler';
import {BasicEventScheduler} from '../event/scheduler/basicEventScheduler';
import {ConstantEventCreator} from '../event/creator/constantEventCreator';
import {IncomeEvent} from '../event/events/incomeEvent';
import {MonthlyScheduler} from '../schedule/schedulers/monthlyScheduler';
import {EventOccurrence} from '../event/eventOccurrence';
import {ExpenseEvent} from '../event/events/expenseEvent';
import {IncomeEventApplier} from '../event/applier/incomeEventApplier';
import {ExpenseEventApplier} from '../event/applier/expenseEventApplier';

let eventOccurrences: EventOccurrence[] = [];

let simpleBank: Account = {
    identifier: new StringAccountIdentifier("simple"),
    balance: 0
};

let paycheckEventScheduler: EventScheduler = new BasicEventScheduler(
    new ConstantEventCreator(
        new IncomeEvent(simpleBank, 'Amazon Paycheck', 7000),
    ),
    new MonthlyScheduler(31)
);

let today: Date = new Date();

let nextEvent = paycheckEventScheduler.getNextEvent(today);
eventOccurrences.push(nextEvent);

console.log(nextEvent);

eventOccurrences.forEach(occurrence => {
    let event = occurrence.event;
    let newAccount: Account;
    if (event instanceof IncomeEvent) {
        let applier = new IncomeEventApplier();
        newAccount = applier.apply(event, event.account);
    } else if (event instanceof ExpenseEvent) {
        let applier = new ExpenseEventApplier();
        newAccount = applier.apply(event, event.account);
    } else {

    }

});
