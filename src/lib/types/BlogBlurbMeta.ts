// I don't wanna waste time figuring out how to fight against the rollup magic
// svelte does so let's just copy paste this class, as a treat LOL
// Mirror is between
// - src/lib/types/BlogBlurbMeta.ts
// - pineapple_scripts/blog_list_data_generator.ts
export class BlogBlurbMeta {
	title = "";
	blurb = "";
	tagList: string[] = [];
	publishDate = "";
	lastUpdate = "";
	previewSrc: any = "";
	previewSrcScript = "";
	previewAlt = "";
	blogLink = "";
}
