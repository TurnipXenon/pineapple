import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { paraglideMiddleware } from "$pkg/external/paraglide/server";
import { edgeCacheOptInHandle } from "$pkg/modules/parsnip/route-util/parsnipCache";

// creating a handle to use the paraglide middleware
const paraglideHandle: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ locale }) => {
		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace("%lang%", locale)
		});
	});

export const handle: Handle = sequence(edgeCacheOptInHandle, paraglideHandle);
