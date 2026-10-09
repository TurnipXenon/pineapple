export enum PortraitType {
	AresHappy = "AresHappy",
	AresDisappointed = "AresDisappointed",
	AresBlushing = "AresBlushing",
	AresLetsGo = "AresLetsGo",
	AresMad = "AresMad",
	AresNeutral = "AresNeutral",
	AresSlightlyMad = "AresSlightlyMad",
	AresSurprised = "AresSurprised",
	AresYay = "AresYay"
}

// https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
type CSSLengthUnit = "px" | "rem" | "em" | "vw" | "vh" | "%";
export type CSSLength = `${number}${CSSLengthUnit}` | "0";

export interface ExtraCharacter {
	name: string,
	image: string,
	offset?: {x?: CSSLength, y?: CSSLength},
	scale?: number,
}
