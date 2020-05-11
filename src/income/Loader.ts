import income from "../../data/monthly_income.json";
import { Income } from "./Income";

export class Loader {
  load(): Income[] {
    return income;
  }
}
