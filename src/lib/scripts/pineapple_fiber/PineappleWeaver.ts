/**
 * Pineapple Fiber
 *
 * A script that generates Typescript files from Yarn where the choices are embedded on
 * the dialogue itself
 *
 * npx vite-node src/lib/scripts/pineapple_fiber/PineappleWeaver.ts
 */

import { getAllFiles } from "$pkg/scripts/util/FileManagement";
import fs, { readFileSync } from "fs";
import type { DialogDetail } from "$pkg/types/pineapple_fiber/DialogDetail";
import { PortraitType } from "$pkg/types/pineapple_fiber/PortraitType";

// import { getAllFiles } from "../util/FileManagement";
// import fs, { readFileSync } from "fs";
// import type { DialogDetail } from "../../types/pineapple_fiber/DialogDetail";
// import { PortraitType } from "../../types/pineapple_fiber/PortraitType";

interface ChoiceDetail {
	name: string;
	jumpNode: string;
}

const shouldDebug = false;

const pineappleWeaverRun = () => {
	console.info("Starting Pineapple Weaver.");
	const BASE_PATH = "./src/routes";
	getAllFiles(BASE_PATH, (path: string): boolean => {
		return path.split(".").pop() === "yarn";
	}).map((filePath) => {
		console.info(`Converting: ${filePath}`);
		const fileContent = readFileSync(filePath, "utf-8");
		const dialogDetailList: DialogDetail[] = [];

		fileContent.split("===").map((unparsedNode) => {
			// todo: detect empty nodes
			// todo: improve the code readability
			if (unparsedNode.trim() === "") {
				return;
			}

			const dialogDetails: DialogDetail = {
				// todo: dissect the line below and give comments because it is complex
				dialogId: unparsedNode
					.slice(unparsedNode.indexOf("title: "))
					.split("\n")[0]
					.split(" ")
					.pop()
					?.trim(),
				portraitType: PortraitType.AresNeutral,
				textContent: "" // will be filled later below
			};
			let portraitUnset = true;

			// parse the PineappleFiber metatags
			const unparsedBody = unparsedNode.split("---").pop()!.trim();
			const bodyList = unparsedBody.split("\n");
			let contentIndexStart = 0;
			for (let index = 0; index < bodyList.length; index++) {
				const possibleTagPair = bodyList[index].split(": ");
				const possibleTagName = possibleTagPair[0].toLowerCase();

				if (!["portrait"].includes(possibleTagName)) {
					break;
				}

				contentIndexStart = index + 1; // increase count for each viable tah
				switch (possibleTagName) {
					case "portrait":
						portraitUnset = false;
						// todo: implement a way to match the appropriate portrait based on the metatag
						// from https://stackoverflow.com/a/17381004/17836168
						dialogDetails.portraitType =
							PortraitType[possibleTagPair[1].trim() as keyof typeof PortraitType];
						if (shouldDebug) {
							console.log(
								"Portrait detected:",
								possibleTagPair[1],
								" => ",
								dialogDetails.portraitType
							);
						}
						break;
				}
			}

			// portrait check
			if (portraitUnset) {
				console.warn(`Portrait missing for node: ${dialogDetails.dialogId}`);
				dialogDetails.portraitType = PortraitType.AresNeutral;
			}

			// remove the metatags from the body
			const unprocessedContent = bodyList.slice(contentIndexStart).join("\n");
			const contentPair = unprocessedContent.split("<ChoiceBreak>");

			if (contentPair.length === 2) {
				// parse for the choice names in the options
				enum ChoiceParsingState {
					Free, // detects for the next option
					Line // previously detected an option, will try to detect for the next option
				}

				let parsingState: ChoiceParsingState = ChoiceParsingState.Free;
				const currentChoiceDetail: ChoiceDetail = { jumpNode: "", name: "" };
				const choiceList: ChoiceDetail[] = [];
				let shouldSkipChoices = false;

				const checkChoiceForSave = () => {
					if (currentChoiceDetail.name !== "") {
						choiceList.push({
							name: currentChoiceDetail.name,
							jumpNode: currentChoiceDetail.jumpNode
						});
					}
				};

				contentPair[1]
					.trim()
					.split("\n")
					.filter((line) => {
						const trimmedLine = line.trim();
						if (shouldSkipChoices) {
							return false;
						}

						if (trimmedLine.startsWith("// ignore the rest")) {
							shouldSkipChoices = true;
							return false;
						}

						return true;
					})
					.map((line) => {
						const trimmedLine = line.trim();

						switch (parsingState) {
							case ChoiceParsingState.Free:
								if (trimmedLine.startsWith("->")) {
									// save previous choice
									checkChoiceForSave();

									// write start of new choice
									currentChoiceDetail.name = trimmedLine.split(" ").pop()!;
									parsingState = ChoiceParsingState.Line;
								}
								break;

							case ChoiceParsingState.Line:
								if (trimmedLine.startsWith("<<jump")) {
									const jumpNode = trimmedLine.split(" ").pop()!;
									currentChoiceDetail.jumpNode = jumpNode.slice(0, jumpNode.length - 2); // remove ">>"
									parsingState = ChoiceParsingState.Free;
								}
								break;

							default:
								console.error(`Unimplemented parsing state: ${parsingState}`);
								break;
						}
					});
				checkChoiceForSave();

				dialogDetails.textContent = contentPair[0];

				// handle choice start tags to a href
				choiceList.forEach((choiceDetail) => {
					const keyword = `<choice ${choiceDetail.name}>`;
					while (dialogDetails.textContent.includes(keyword)) {
						dialogDetails.textContent = dialogDetails.textContent.replace(
							keyword,
							`<a class="choice-${choiceDetail.jumpNode} dialog-choice" title="Click to continue the dialog">`
						);
					}
				});

				const externalKeyword = "<a href=";
				while (dialogDetails.textContent.includes(externalKeyword)) {
					dialogDetails.textContent = dialogDetails.textContent.replace(
						externalKeyword,
						'<a target="_blank" class="external-link" href='
					); // make all external tags with a custom cursor
				}

				const choiceEndKeyword = "</choice>";
				while (dialogDetails.textContent.includes(choiceEndKeyword)) {
					dialogDetails.textContent = dialogDetails.textContent.replace(choiceEndKeyword, "</a>"); // convert all choice end tags to a tags
				}
			} else {
				// assume only one which indicates it's choiceless
				dialogDetails.textContent = unprocessedContent;
			}

			dialogDetailList.push(dialogDetails);
		});

		const dialogDetailToString = (detail: DialogDetail): string => {
			if (detail.portraitType === undefined) {
				detail.portraitType = PortraitType.AresNeutral;
				console.error(`Missing portrait at dialog: ${detail.dialogId}`);
				console.error(`It contains: ${detail.textContent}`);
			}
			return `		{
			dialogId: "${detail.dialogId}",
			portraitType: PortraitType.${detail.portraitType.toString()},
			textContent: \`${detail.textContent}\`
		},`;
		};

		const dialogDetailListToString = (detailList: DialogDetail[]): string => {
			return detailList
				.map((detail) => {
					return dialogDetailToString(detail);
				})
				.join("\n");
		};

		// generate file
		const filePathList = filePath.split(".");
		const fileName = filePathList[filePathList.length - 2].split("/").pop();
		const template = `// this file was generated by PineappleWeaver.ts
// do not edit!
			
import type { DialogDetail } from "@turnipxenon/pineapple";
import { dialogManager, PortraitType } from "@turnipxenon/pineapple";

class _${fileName}Yarn {
	dialogList: DialogDetail[] = [
${dialogDetailListToString(dialogDetailList)}
	];
	
	/* Remember to call DialogManager.subscribeToSetDialogChoice before calling this in Svelte */
	setDialogTree = () => {
		dialogManager.setDialogTree(this.dialogList);
	};
}

export const ${fileName}Yarn = new _${fileName}Yarn();
`;

		const filePathSplit = filePath.split(".");
		filePathSplit.pop();
		const generatedPath = `${filePathSplit.join(".")}Yarn.ts`;
		fs.writeFileSync(generatedPath, template);
	});

	console.info("Finish converting all yarn files!");
};

pineappleWeaverRun();
