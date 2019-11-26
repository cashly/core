import {AccountIdentifier} from "./accountIdentifier";

export class StringAccountIdentifier implements AccountIdentifier {
    public readonly identifier: string;

    constructor(identifier: string) {
        this.identifier = identifier;
    }

    equals(other: AccountIdentifier): boolean {
        if (other instanceof StringAccountIdentifier) {
            return this.identifier === other.identifier;
        } else {
            return false;
        }
    }
}
