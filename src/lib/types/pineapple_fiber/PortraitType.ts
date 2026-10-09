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

export interface ExtraCharacter {
	name: string,
	image: string,
	offset: {x: number, y: number},
	scale: number,
}
