import {IncomeEvent} from "../events/incomeEvent";
import {EventApplier} from "./eventApplier";
import {Account} from "../../account/account";

export class IncomeEventApplier implements EventApplier<IncomeEvent> {
    apply(event: IncomeEvent, account: Account) {
        let newBalance = account.balance + event.amount;
        return {
            ...account,
            balance: newBalance
        }
    }
}