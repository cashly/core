import {Event} from '../events/event';

/**
 * Creates events
 */
export interface EventCreator<T extends Event> {
    create: (date: Date) => T;
}
