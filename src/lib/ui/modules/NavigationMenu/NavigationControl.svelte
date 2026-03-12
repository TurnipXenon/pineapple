<!-- TODO: Documentation: consider documentation showcase -->

<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/state";
	import { goto } from "$app/navigation";
	import { PinyaButton, PinyaCard } from "$pkg/ui/elements/index";

	interface Props {
		currentIndex?: number;
		contentLength: number;
		pageSize: number;
		selectedTags?: string[];
		queryReady?: boolean;
	}

	let {
		currentIndex = $bindable(0),
		contentLength,
		pageSize = $bindable(),
		selectedTags = $bindable([]),
		queryReady = $bindable(false)
	}: Props = $props();

	const parseTags = (searchParams: URLSearchParams): string[] => {
		const repeated = searchParams.getAll("tags");
		const rawValues = repeated.length > 0 ? repeated : [searchParams.get("tags") ?? ""];
		const seen = new Set<string>();
		return rawValues
			.flatMap((value) => value.split(","))
			.map((tag) => tag.trim())
			.filter((tag) => {
				if (!tag) {
					return false;
				}
				const normalized = tag.toLocaleLowerCase();
				if (seen.has(normalized)) {
					return false;
				}
				seen.add(normalized);
				return true;
			});
	};

	const syncQuery = () => {
		const query = new URLSearchParams(page.url.searchParams.toString());
		query.set("index", currentIndex.toString());
		query.set("pageSize", pageSize.toString());
		query.delete("tags");
		selectedTags.forEach((tag) => query.append("tags", tag));
		goto(`?${query.toString()}`, {
			replaceState: true,
			noScroll: true,
			keepFocus: true
		});
	};

	const movePage = (isNext: boolean) => {
		if (isNext) {
			currentIndex = currentIndex + 1;
		} else {
			currentIndex = currentIndex - 1;
		}
		syncQuery();
	};

	onMount(() => {
		const queryIndex = page.url.searchParams.get("index");
		if (queryIndex) {
			currentIndex = parseInt(queryIndex) || 0;
		}
		const queryPageSize = page.url.searchParams.get("pageSize");
		if (queryPageSize) {
			pageSize = parseInt(queryPageSize) || 5;
		}
		selectedTags = parseTags(page.url.searchParams);
		queryReady = true;
		syncQuery();
	});
</script>

<div class="navigation-control-container">
	<PinyaButton
		classes="w-12 h-12"
		disabled={currentIndex <= 0}
		onclick={() => {
			movePage(false);
		}}
		>&lt;
	</PinyaButton>
	<div>
		<PinyaCard widthClass="" paddingClass="pt-2 pb-2 pl-8 pr-8">
			<span class="fake-h2">Page {currentIndex + 1}</span>
		</PinyaCard>
	</div>
	<PinyaButton
		classes="w-12 h-12"
		disabled={(currentIndex + 1) * pageSize >= contentLength}
		onclick={() => {
			movePage(true);
		}}
		>&gt;
	</PinyaButton>
</div>

<style>
	.navigation-control-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
