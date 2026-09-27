import { env } from "$env/dynamic/private";
import { createParsnipRevalidateHandler } from "$pkg/modules/parsnip/route-util/parsnipCache";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = createParsnipRevalidateHandler(
	() => env.PARSNIP_REVALIDATE_TOKEN
);
