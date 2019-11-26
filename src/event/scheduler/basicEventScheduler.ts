import {EventScheduler} from './eventScheduler';
import {EventCreator} from '../creator/eventCreator';
import {Scheduler} from '../../schedule/schedulers/scheduler';

export class BasicEventScheduler implements EventScheduler {
    private readonly eventCreator: EventCreator;
    private readonly scheduler: Scheduler;

    constructor(eventCreator: EventCreator, scheduler: Scheduler) {
        this.eventCreator = eventCreator;
        this.scheduler = scheduler;
    }

    getNextEvent(currentDate: Date) {
        let nextDate = this.scheduler.getNextDate(currentDate);
        let nextEvent = this.eventCreator.create();

        return {
            date: nextDate,
            event: nextEvent
        };
    }
}
