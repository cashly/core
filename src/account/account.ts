import {AccountIdentifier} from "./accountIdentifier";

export interface Account {
    readonly identifier: AccountIdentifier;
    readonly balance: number;
}
