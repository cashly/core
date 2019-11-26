import {Event} from "./events/event";
import {AccountStatuses} from "../account/accountStatuses";

export interface EventOccurrence {
    /**
     * When the event occurred
     */
    date: Date;
    /**
     * The event that occurred
     */
    event: Event;
}
