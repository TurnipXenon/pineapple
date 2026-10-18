import { query } from "$app/server";
import * as v from "valibot";
import { getFoodReviewRating } from "./foodReviewRating";

const SlugSchema = v.pipe(v.string(), v.minLength(1), v.maxLength(512));

export const getFoodReviewRatingRemote = query(SlugSchema, getFoodReviewRating);
