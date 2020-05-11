import { CreditCard } from "./CreditCard";
import creditCards from "../../data/credit_cards.json";
import {
  addPayments,
  constantPayment,
  interestPayment,
  interestPlusPercentOfCurrentBalanceOrFloorPayment,
  maxPayment,
  percentOfCurrentBalancePayment,
} from "./MinimumPayments";

export class Loader {
  load(): CreditCard[] {
    return creditCards.map((card) => {
      return {
        ...card,
        minimumPayment: this.minimumPaymentMapper(card.name),
      };
    });
  }

  private minimumPaymentMapper(card: string): (card: CreditCard) => number {
    switch (card) {
      case "Citi Double Cash":
        return maxPayment(
          constantPayment(25),
          percentOfCurrentBalancePayment(0.02),
          addPayments(percentOfCurrentBalancePayment(0.01), interestPayment())
        );
      case "Apple Barclays":
        return interestPlusPercentOfCurrentBalanceOrFloorPayment(0.01, 27);
      case "Capital One":
        return constantPayment(69);
      case "Amazon Chase":
        return interestPlusPercentOfCurrentBalanceOrFloorPayment(0.01, 35);
      case "Best Buy":
        return constantPayment(145);
      case "Nordstrom":
        return interestPlusPercentOfCurrentBalanceOrFloorPayment(0.01, 38);
      case "Banana Republic":
        return constantPayment(0);
      default:
        throw new Error("No minimum payment for card " + card);
    }
  }
}
