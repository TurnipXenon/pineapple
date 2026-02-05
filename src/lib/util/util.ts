export const generatedDailySeed = (): number => {
	const date = new Date();
	const time = date.getTime() + 86400000;
	return time - (time % 86400000);
};

// psuedo misc with seed
// from https://stackoverflow.com/a/47593316
export const mulberry32Generator = (a: number): (() => number) => {
	return function() {
		let t = (a += 0x6d2b79f5);
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
};

export const createGoToFunction = (path: string): (() => void) => {
	return (() => {
		location.href = path;
	});
};

export interface ExternalLinkWarningArgs {
	href: string;
}

export const createExternalLinkWarningFunction = (args: ExternalLinkWarningArgs): (() => void) => {
	return (() => {
		// todo: https://github.com/TurnipXenon/pineapple/issues/99
		//  add the warning here for future functions
		location.href = args.href;
	});
};

export interface RawGlob {
	default: string;
}

export const getQueryTerms = (modules: Record<string, unknown>): string[] => {
	const re = new RegExp("qt-(\\w+)+", "g");
	const queryTerms = new Set<string>();
	for (const path in modules) {
		const modStr = modules[path] as string;
		[...modStr.matchAll(re).map(i => i[1])].forEach(term => queryTerms.add(term));
	}
	return [...queryTerms].sort();
}
