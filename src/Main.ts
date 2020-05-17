import { Loader as AssetLoader } from "./asset/Loader";
import { Loader as CreditCardLoader } from "./credit_card/Loader";
import { Reporter as DebtReporter } from "./debt/Reporter";
import { Loader as AffirmLoanLoader } from "./affirm_loans/Loader";
import { Debt } from "./debt/Debt";
import { Loader as ExpenseLoader } from "./expense/Loader";
import { Loader as IncomeLoader } from "./income/Loader";
import { Reporter as AmountReporter } from "./named_amount/Reporter";
import { Reporter as CreditCardReporter } from "./credit_card/Reporter";
import { Reporter as AffirmLoanReporter } from "./affirm_loans/Reporter";
import { Loader as BillLoader } from "./bills/Loader";
import { Reporter as BillReporter } from "./bills/Reporter";
import { Loader as WithholdingsLoader } from "./withholdings/Loader";
import { WithholdingApplier } from "./income_withholding/WithholdingApplier";
import { Reporter as IncomeWithholdingReporter } from "./income_withholding/Reporter";

function printHeader(title: string): void {
  const length = title.length + 3;
  let headerBlock = "";
  for (let i = 0; i < length; i++) {
    headerBlock += "=";
  }
  console.log(`\n\n${headerBlock}\n${title}\n${headerBlock}`);
}

function namedAmountReports(): void {
  printHeader("Assets/Expenses");
  const assets = new AssetLoader().load();
  const expenses = new ExpenseLoader().load();

  const amountReporter = new AmountReporter();
  console.log("Total assets: $" + amountReporter.sum(assets));
  console.log("Total monthly expenses: $" + amountReporter.sum(expenses));
}

function debtReports(): void {
  printHeader("Debts");
  const creditCards = new CreditCardLoader().load();
  const affirmLoans = new AffirmLoanLoader().load();

  console.log(
    creditCards.map((card) => {
      const info = {
        ...card,
      };
      delete info.is_store_card;
      delete info.minimumPayment;
      delete info.interest_rate;
      return info;
    })
  );

  console.log(
    affirmLoans.map((loan) => {
      const info = {
        ...loan,
      };
      delete info.minimum_payment;
      delete info.interest_rate;
      return info;
    })
  );

  const debts: Debt[] = Array.prototype.concat(affirmLoans, creditCards);

  const debtReporter = new DebtReporter();
  const creditCardReporter = new CreditCardReporter();
  const affirmLoanReporter = new AffirmLoanReporter();

  console.log("Monthly interest: $" + debtReporter.totalInterest(debts));
  console.log("Monthly affirm payments: $" + affirmLoanReporter.totalPayments(affirmLoans));
  console.log("Monthly credit card payments: $" + creditCardReporter.totalMinimumPayments(creditCards));
  console.log("Remaining credit: $" + creditCardReporter.remainingCredit(creditCards));
  console.log("Remaining non-store credit: $" + creditCardReporter.remainingNonStoreCredit(creditCards));
}

async function billReports(): Promise<void> {
  printHeader("Bills");
  const bills = await new BillLoader().load();
  const billReporter = new BillReporter();
  bills.forEach((bill) => {
    console.log(bill.name, billReporter.averageCost(bill));
  });
}

function incomeReports(): void {
  printHeader("Income");
  const income = new IncomeLoader().load();
  const amountReporter = new AmountReporter();

  console.log("Total monthly income: $" + amountReporter.sum(income));

  const withholdings = new WithholdingsLoader().load();
  const appliedWithholdings = new WithholdingApplier().applyAll(income.slice(0, 1), withholdings);
  const incomeWithholdingReporter = new IncomeWithholdingReporter();

  appliedWithholdings.forEach((withholding) => {
    const sum = incomeWithholdingReporter.sum(withholding);
    console.log("Withholding: $" + sum);
    console.log("Income after withholding: $" + (withholding.income.amount - sum));
  });
}

namedAmountReports();
debtReports();
billReports().then();
incomeReports();
