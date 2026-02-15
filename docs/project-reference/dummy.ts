export interface MetaCustom {
	/* optional. if empty, startDate is collected from the first commit */
	startCommit?: string;
	/* optional. if empty, endDate is collected from the last commit */
	endCommit?: string;
	/* tags added on top of the classes with prefix qt- in layout.html */
	extraTags?: string[];
	/* priority of the project in the default list or sort */
	priority?: number;
}
