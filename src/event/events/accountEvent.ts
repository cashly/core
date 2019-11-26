import {Account} from '../../account/account';
import {Event} from './event';

export interface AccountEvent extends Event {
    account: Account;
}
