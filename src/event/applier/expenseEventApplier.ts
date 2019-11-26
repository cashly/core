import {EventApplier} from "./eventApplier";
import {Account} from "../../account/account";
import {ExpenseEvent} from "../events/expenseEvent";

export class ExpenseEventApplier implements EventApplier<ExpenseEvent> {
    apply(event: ExpenseEvent, account: Account) {
        let newBalance = account.balance - event.amount;
        let newAccount = {
            ...account,
            balance: newBalance
        };
        return {
          eventOccurrence:
        }
    }
}
