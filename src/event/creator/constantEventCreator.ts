import {EventCreator} from './eventCreator';
import {Event} from '../events/event';

export class ConstantEventCreator implements EventCreator {
    private readonly event: Event;

    constructor (event: Event) {
        this.event = event;
    }

    create() {
        return this.event;
    }
}
