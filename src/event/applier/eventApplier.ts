import {Account} from "../../account/account";
import {Event} from '../events/event';

/**
 * Applies events to accounts
 */
export interface EventApplier<T extends Event> {
    apply: (event: T, account: Account) => Account;
}
