import { promises } from "fs";
import { UtilityBill } from "./UtilityBill";
import { isJsonBill } from "./JsonBill";

export class Loader {
  async load(): Promise<UtilityBill[]> {
    const dir = "data/bills/utilities/";

    const files = await promises.readdir(dir);

    return await Promise.all(
      files.map(async (file) => {
        const fileNameWithoutExtension = file.substring(0, file.indexOf("."));
        const contents = await promises.readFile(dir + file, "utf-8");
        const contentsAsJson = JSON.parse(contents);
        const contentsAsBills = contentsAsJson.map((entry: unknown) => {
          if (isJsonBill(entry)) {
            const entryDate = entry["date"];
            return {
              amount: entry["amount"],
              date: new Date(entryDate["year"], entryDate["month"], entryDate["day"]),
            };
          } else {
            throw Error("Unknown value " + entry);
          }
        });
        return {
          name: fileNameWithoutExtension,
          history: contentsAsBills,
        };
      })
    );
  }
}
