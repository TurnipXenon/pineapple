export type FoodReviewJson = LdReview | LdBrand;

export interface LdReview {
	"@type": "Review";
	datePublished: string;
	reviewRating: {
		ratingValue: number;
	};
	itemReviewed: {
		url?: string;
	};
}

export interface LdBrand {
	"@type": "Brand";
	datePublished: string;
	url?: string;
	aggregateRating: {
		ratingValue: number;
		reviewCount?: number;
	};
	review: LdReview[];
}

export const LdSchemaUtil = {
	getReviewRating: (review: FoodReviewJson): number => {
		if (review["@type"] === "Review") {
			return review.reviewRating.ratingValue;
		} else {
			// Brand
			return review.aggregateRating.ratingValue;
		}
	},

	getUrl: (review: FoodReviewJson): string | undefined => {
		if (review["@type"] === "Review") {
			return review.itemReviewed.url;
		} else {
			// Brand
			return review.url;
		}
	}
} as const;
