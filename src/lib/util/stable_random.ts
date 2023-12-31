export const generatedDailySeed = (): number => {
	const date = new Date();
	const time = date.getTime() + 86400000;
	return time - (time % 86400000);
};

// psuedo misc with seed
// from https://stackoverflow.com/a/47593316
export const mulberry32Generator = (a: number): (() => number) => {
	return function () {
		var t = (a += 0x6d2b79f5);
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
};
