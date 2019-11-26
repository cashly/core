import {Account} from "../../account/account";
import {Event} from '../events/event';
import {EventApplication} from './eventApplication';

export interface EventApplier<T extends Event> {
    apply: (event: T, account: Account) => EventApplication;
}
