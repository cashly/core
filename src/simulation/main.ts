import {Account} from '../account/account';
import {StringAccountIdentifier} from '../account/stringAccountIdentifier';
import {EventScheduler} from '../event/scheduler/eventScheduler';
import {ConstantIncomeEventCreator} from '../event/creator/constantIncomeEventCreator';
import {MonthlyScheduler} from '../schedule/schedulers/monthlyScheduler';
import {AccountEventScheduler} from '../schedule/accountEventScheduler';
import {Event} from '../event/events/event';
import {addYears} from 'date-fns';
import {PriorityQueue} from 'typescript-collections';
import {AccountEventCause} from '../event/AccountEventCause';
import {AccountEvent} from '../event/events/accountEvent';

let simpleBank: Account = {
    identifier: new StringAccountIdentifier("simple"),
    balance: 0
};

let paycheckEventScheduler = new EventScheduler(
    new ConstantIncomeEventCreator("Paycheck", 9000),
    new MonthlyScheduler(31)
);

let schedulers = [];
let accountEventScheduler = new AccountEventScheduler(paycheckEventScheduler, simpleBank);
schedulers.push(accountEventScheduler);

function simulate<T extends Event, V extends AccountEvent>(schedulers: AccountEventScheduler<T>[], start: Date, end: Date) {
    let queue = new PriorityQueue<AccountEventCause<AccountEventScheduler<T>>>((a, b) => {
        return a.event.date.getTime() - b.event.date.getTime();
    });

    let currentDate = start;

    schedulers.forEach(scheduler => {
        let eventCause: AccountEventCause<AccountEventScheduler<T>> = {
            event: scheduler.getNextEvent(currentDate),
            cause: scheduler
        };
        queue.add(eventCause)
    });

    while (currentDate < end) {
        let nextEvent = queue.dequeue();
        if (!nextEvent) {
            break;
        }

        currentDate = nextEvent.event.date;

        // TODO APPLY EVENT
        console.log(nextEvent.event);

        queue.enqueue({
            event: nextEvent.cause.getNextEvent(currentDate),
            cause: nextEvent.cause
        });
    }
}

let today: Date = new Date();
let oneYear: Date = addYears(today, 1);

simulate(schedulers, today, oneYear);
