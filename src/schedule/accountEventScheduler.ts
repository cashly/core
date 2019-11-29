import {EventScheduler} from '../event/scheduler/eventScheduler';
import {Event} from '../event/events/event';
import {Account} from '../account/account';
import {AccountEvent} from '../event/events/accountEvent';

export class AccountEventScheduler<T extends Event> {
    private readonly eventScheduler: EventScheduler<T>;
    private readonly account: Account;

    constructor(eventScheduler: EventScheduler<T>, account: Account) {
        this.eventScheduler = eventScheduler;
        this.account = account;
    }

    getNextEvent(currentDate: Date): AccountEvent {
        let event = this.eventScheduler.getNextEvent(currentDate);
        return new AccountEvent(event, this.account)
    }
}
