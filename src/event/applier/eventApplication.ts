import {EventOccurrence} from '../eventOccurrence';
import {Account} from '../../account/account';

export interface EventApplication {
    readonly eventOccurrence: EventOccurrence;
    readonly oldAccountState: Account;
    readonly newAccountState: Account;
}
