import type { FoodReviewJson } from "$pkg/ui/modules/index";
import type { ParsnipEntrySummary } from "$pkg/modules/parsnip/ParsnipOverall";
import type { Root } from "mdast";

export interface ParsnipEntry extends ParsnipEntrySummary {
	ast: { ast: Root };
	foodReviewJson: FoodReviewJson;
}
