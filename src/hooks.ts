import type { Reroute } from '@sveltejs/kit';
import { deLocalizeUrl } from '$pkg/paraglide/runtime';

export const reroute: Reroute = (request) => {
	return deLocalizeUrl(request.url).pathname;
};
