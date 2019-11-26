import {EventOccurrence} from "../eventOccurrence";

export interface EventScheduler {
    getNextEvent: (currentDate: Date) => EventOccurrence;
}
