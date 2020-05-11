import { Asset } from "./Asset";
import assets from "../../data/assets.json";

export class Loader {
  load(): Asset[] {
    return assets;
  }
}
