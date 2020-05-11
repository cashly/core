import { AffirmLoan } from "./AffirmLoan";
import affirmLoans from "../../data/affirm_loans.json";

export class Loader {
  load(): AffirmLoan[] {
    return affirmLoans;
  }
}
