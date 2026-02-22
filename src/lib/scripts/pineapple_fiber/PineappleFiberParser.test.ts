import { parseYarn } from "$pkg/scripts/pineapple_fiber/PineappleFiberParser";
import { describe, expect, it } from "vitest";
import TutorialBrokenYarn from "./TutorialBroken.yarn?raw";

describe("parseYarn", () => {
	it("should return warnings", async () => {
		const result = await parseYarn(TutorialBrokenYarn);
		// detect jump with no choice
		expect(result.find(d => d.warningList?.find(wl => wl.includes("Jump name is not used in any <choice> tag")))).not.toBeNull();
		// detect choice with no jump
		expect(result.find(d => d.warningList?.find(wl => wl.includes("Choice has no jump")))).not.toBeNull();
	});
});
