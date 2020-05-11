import { AbsoluteWithholding } from "./AbsoluteWithholding";
import { RelativeWithholding } from "./RelativeWithholding";
import absoluteWithholdings from "../../data/withholdings/absolute.json";
import relativeWithholdings from "../../data/withholdings/relative.json";

export class Loader {
  load(): (AbsoluteWithholding | RelativeWithholding)[] {
    return Array.prototype.concat(absoluteWithholdings, relativeWithholdings);
  }
}
