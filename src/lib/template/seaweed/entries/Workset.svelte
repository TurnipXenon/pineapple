<script lang="ts">
	import { type EntryProps } from "./EntryProps";
	import Card from "$pkg/components/Card.svelte";
	import GithubIcon from "$pkg/assets/icons/github-mark.svg";
	import WindowSetGraph from "$pkg/assets/others/window-set.png";

	// noinspection JSUnusedGlobalSymbols
	interface Props {
		props: EntryProps;
	}

	let { props }: Props = $props();
</script>

<Card>
	{#snippet content()}
		<section class="project-card" >
			<img
				alt="A graph that visualizes the number of memory pages made by Quicksort cached within the window set as
							time goes by. The trend appears to look like a damping harmonic motion that does not go below the zero line. More
							details include the data size being 200000 entries, each data point skips 1060174 data points, with a
							page size of 4096 bytes, and window size of 100000 bytes."
				src={WindowSetGraph} />
			<div class="project-card-body">
				<h2>Working set simulation</h2>

				<p>
					A <span class="qt-c">C</span> program that simulates the working set model based on the output of memory
					addresses
					<span class="qt-valgrind">valgrind</span> detects as being accessed by a program being ran. It's
					implemented using a nested hashmap <span class="qt-foundation">data structure</span> implemented from
					scratch. The working set is the collection of memory pages referenced by a program within a certain time
					frame. It comes with a report analyzing and benchmarking how memory allocation, between sorting <span
					class="qt-foundation">algorithms</span> heapsort, quicksort, and radixsort, is affected by the window set
					size, page size, and their input size.
				</p>

				<section class="game-link-section">
					<button type="button" class="game-button turnip-button"
					        role="link"
					        title="https://github.com/TurnipXenon/C380-1Code/blob/main/Assignment03/REPORT.pdf"
					        onclick={() => window.open("https://github.com/TurnipXenon/C380-1Code/blob/main/Assignment03/REPORT.pdf")}>
						<img src={GithubIcon} class="long-btn-image" alt="github icon">
						<span>Benchmark report</span>
					</button>
					<button type="button" class="game-button turnip-button"
					        role="link"
					        title="https://github.com/TurnipXenon/C380-1Code/blob/main/Assignment03/DESIGN.md"
					        onclick={() => window.open("https://github.com/TurnipXenon/C380-1Code/blob/main/Assignment03/DESIGN.md")}>
						<img src={GithubIcon} class="long-btn-image" alt="github icon">
						<span>Design</span>
					</button>
				</section>
			</div>
		</section>
	{/snippet}
</Card>
