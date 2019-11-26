import {Event} from '../events/event';

export interface EventCreator {
    create: () => Event;
}
