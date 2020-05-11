import expenses from "../../data/monthly_expenses.json";
import { Expense } from "./Expense";

export class Loader {
  load(): Expense[] {
    return expenses;
  }
}
