import { getAllFiles } from "$lib/scripts/util/FileManagement";
import { readFileSync } from "fs";
/**
 * checks for manual dialog tree sets in all files except for *Yarn.ts and DialogManager.ts
 */
const checkManualDialogSet = () => {
    // todo:
    const BASE_PATH = "./src/routes";
    getAllFiles(BASE_PATH, (path) => {
        // from: https://stackoverflow.com/a/424006/17836168
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const filename = path.split("\\").pop().split("/").pop();
        const isNonYarn = !filename.endsWith("Yarn.ts");
        // takes advantage of lazy evaluation
        // is non-yarn and is not exempted
        return isNonYarn && !["DialogManager.ts"].includes(filename);
    }).map((filePath) => {
        // todo:
        const fileContent = readFileSync(filePath, "utf-8");
        if (fileContent.includes("dialogManager.setDialogTree")) {
            console.warn(`Warning! Manual dialog tree set found in path: ${filePath}`);
        }
    });
};
export const runAll = () => {
    checkManualDialogSet();
};
//# sourceMappingURL=ManualCheck.js.map