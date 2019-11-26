/**
 * A collection of accounts
 */
import {AccountIdentifier} from './accountIdentifier';
import {Account} from './account';

export interface AccountStatuses {
    getAccounts: () => Account[];
    getAccount: (accountIdentifier: AccountIdentifier) => Account;
    setAccount: (account: Account) => AccountStatuses;
}
