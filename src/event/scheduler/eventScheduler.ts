import {Event} from '../events/event';
import {EventCreator} from '../creator/eventCreator';
import {Scheduler} from '../../schedule/schedulers/scheduler';

export class EventScheduler<T extends Event> {
    private readonly eventCreator: EventCreator<T>;
    private readonly scheduler: Scheduler;

    constructor(eventCreator: EventCreator<T>, scheduler: Scheduler) {
        this.eventCreator = eventCreator;
        this.scheduler = scheduler;
    }

    getNextEvent(currentDate: Date) {
        let nextDate = this.scheduler.getNextDate(currentDate);
        return this.eventCreator.create(nextDate);
    }
}
