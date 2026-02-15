// noinspection JSUnusedGlobalSymbols

import * as ObsidianPublisher from "$pkg/ui/modules/projects/ObsidianPublisher.svelte";
import type { SnippetMeta } from "$pkg/ui/templates/index";
import * as Hepcat from "./ui/modules/projects/Hepcat.svelte";
import * as Pengi from "./ui/modules/projects/Pengi.svelte";
import * as Soulwork from "./ui/modules/projects/Soulwork.svelte";
import * as ThisWebpage from "./ui/modules/projects/ThisWebpage.svelte";

export const projectList: SnippetMeta[] = [
	ThisWebpage,
	Hepcat,
	Pengi,
	Soulwork,
	ObsidianPublisher
];
