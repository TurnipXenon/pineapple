<script lang="ts">

	export let email = "turnipxenon@gmail.com";

	import "./seaweed.postcss";
	import { getModalStore } from "@skeletonlabs/skeleton";
	import LinkIcon from "$pkg/assets/icons/link-icon.svg";
	import GithubIcon from "$pkg/assets/icons/github-mark.svg";
	import WeaverFootage from "$pkg/assets/others/weaver-footage.gif";
	import WindowSetGraph from "$pkg/assets/others/window-set.png";
	import ThisWebsiteFootage from "$pkg/assets/others/seaweed-showcase.mp4";
	import Card from "$pkg/components/Card.svelte";
	import Chip from "$pkg/components/Chip.svelte";
	import type { ModalSettings } from "@skeletonlabs/skeleton";

	const modalStore = getModalStore();
	const cmput401Info: ModalSettings = {
		type: "confirm",
		title: "Information",
		body: "As a full disclosure, this link will lead you to <a href='https://cmput401.ca/projects/e5b13586-09c7-4ddd-baf6-fdb078d23398' target='_blank'>" +
			"https://cmput401.ca/projects/e5b13586-09c7-4ddd-baf6-fdb078d23398</a>. " +
			"We currently don't have any tests yet ensuring that the link is correct. " +
			`Click confirm to go to the site. Please report any bugs at <a href='mailto:${email}' target='_blank'>` +
			`${email}</a>.`,
		response: (r: boolean) => {
			if (r) {
				window.open("https://cmput401.ca/projects/e5b13586-09c7-4ddd-baf6-fdb078d23398");
			}
		}
	};
</script>

<Card>
	<section class="section-card title-card" slot="content">
		<h1 class="text-center">Projects</h1>
	</section>
</Card>

<section class="projects-section">
	<Card>
		<section class="project-card" slot="content">
			<iframe id="migrante-alberta"
			        width="560" height="315" src="https://www.youtube.com/embed/ZemWwf8jh8E?si=RZwSfYHI-0Ael-RE"
			        title="YouTube video player" style="border: none"
			        allowfullscreen></iframe>
			<div class="project-card-body">
				<!-- todo: add regression to see if page is gone: https://cmput401.ca/api/projects/e5b13586-09c7-4ddd-baf6-fdb078d23398 -->

				<h2>Migrante Alberta</h2>
				<p>We developed a mobile-first cross-platform application to be used by the Canadian-based
					Filipino non-profit advocacy group, Migrante Alberta, to help new immigrants navigate
					through local services and events
				</p>
				<p>
					<Chip>Flutter</Chip>
					<Chip>Dart</Chip>
					<Chip>Python</Chip>
					<Chip>Django</Chip>
					<Chip>Heroku</Chip>
					<Chip>Android</Chip>
					<Chip>Postgresql</Chip>
				</p>
				<!-- todo: add a way to ask what did i do via chat?  -->
				<!--					<p>-->
				<!--						I helped make reusable Flutter components for the application’s frontend, Dart utility files to-->
				<!--						help ease writing and debugging calls to the backend, and a troubleshooting documentation-->
				<!--						for handling common issues-->
				<!--					</p>-->
				<!--					<p>-->
				<!--						Added Python unit tests to the backend endpoints, refactored the backend’s authentication-->
				<!--						system from plain text to using Django’s authentication system, and wrote a script to ease-->
				<!--						deployment to Heroku-->
				<!--					</p>-->

				<!-- todo: add tags with Dart, Flutter, Python, Django, Heroku, Android -->

				<section class="game-link-section">
					<button type="button" class="btn variant-filled-primary turnip-button"
					        title="https://selk.io/birb-project/trunk/"
					        on:click={() => modalStore.trigger(cmput401Info)}>
						<img src={LinkIcon} class="long-btn-image" alt="itch icon">
						<span>cmput401.ca</span>
					</button>
				</section>

			</div>
		</section>
	</Card>

	<Card>
		<section class="project-card" slot="content">
			<div class="project-card-body">

				<h2>Decentralized social media</h2>

				<p>We made a full stack decentralized social media app made with <span class="qt-react">React</span> +
					<span class="qt-js">Javascript</span> for the client code, <span class="qt-django">Django</span> + <span
						class="qt-python">Python</span> for the backend code, and <span class="qt-heroku">Heroku</span> for
					deployment. This project was made
					for
					our Web Applications and Architecture class.</p>
				<p>The application can connect with three other decentralized social media app in the same class:
				</p>
				<ul>
					<li>
						<a href="https://github.com/hgshah/cmput404-project/blob/main/docs/testing_other_teams.md#team-14"
						   target="_blank">Also
							a social media with the same Django + Python backend server where they act on behalf of
							our users interacting with theirs</a></li>
					<li>
						<a href="https://github.com/hgshah/cmput404-project/blob/main/docs/testing_other_teams.md#team-7"
						   target="_blank">A
							social media that uses Fast API + Python for their backend server</a></li>
					<li>
						<a href="https://github.com/hgshah/cmput404-project/blob/main/docs/testing_other_teams.md#team-12"
						   target="_blank">Another
							social media that has Django + Python for their backend but we have to act on behalf of
							our
							users interacting with their users</a>
					</li>
				</ul>

				<!-- todo: add tags with Javascript, React, Python, Django, Heroku -->

				<section class="game-link-section">
					<button type="button" class="game-button turnip-button"
					        role="link"
					        title="https://github.com/hgshah/cmput404-project"
					        on:click={() => window.open("https://github.com/hgshah/cmput404-project")}>
						<img src={GithubIcon} alt="github icon">
					</button>
				</section>
			</div>
		</section>
	</Card>

	<Card>
		<section class="project-card" slot="content">
			<img alt="Footage of a visual novel-like dynamic dialog interaction happening on the same page we are on"
			     src={WeaverFootage} />

			<div class="project-card-body">
				<h2>Customized Yarnspinner interpreter and dialog runner</h2>

				A custom dialog interpreter, written in <span class="qt-ts">Typescript</span>, that tokenizes then
				transpiles custom Yarnspinner dialog into a <span class="qt-ts">Typescript</span> file. The said files can
				be used on a corresponding runner or library, also implemented alongside it, allowing the ability to play a
				custom-flavor of YarnSpinner dialogs on <span class="qt-svelte">Svelte</span>.

				<section class="game-link-section">
					<button type="button" class="game-button turnip-button"
					        role="link"
					        title="https://github.com/TurnipXenon/pineapple/blob/main/docs/PineappleFiberSpec.md"
					        on:click={() => window.open("https://github.com/TurnipXenon/pineapple/blob/main/docs/PineappleFiberSpec.md")}>
						<img src={GithubIcon} alt="github icon">
					</button>
				</section>
			</div>
		</section>
	</Card>

	<Card>
		<section class="project-card" slot="content">
			<div class="project-card-body">
				<h2>Full-stack <span class="qt-c">C</span> app</h2>

				<p>
					A terminal-based app consisting of a server observing several terminal apps all concurrently
					sending updates to the server, which then broadcasts these information concurrently to all the
					other terminal apps connected.
				</p>
				<p>
					The project involves <span class="qt-foundation">multiprocessing</span> programming featuring pthreads and
					mutexes, and <span class="qt-foundation">networking</span> via sockets.
				</p>

				<section class="game-link-section">
					<button type="button" class="game-button turnip-button"
					        role="link"
					        title="https://github.com/TurnipXenon/C380-1Code/blob/main/Assignment02/DESIGN.md"
					        on:click={() => window.open("https://github.com/TurnipXenon/C380-1Code/blob/main/Assignment02/DESIGN.md")}>
						<img src={GithubIcon} class="long-btn-image" alt="github icon">
					</button>
				</section>
			</div>
		</section>
	</Card>

	<Card>
		<section class="project-card" slot="content">
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
					        on:click={() => window.open("https://github.com/TurnipXenon/C380-1Code/blob/main/Assignment03/REPORT.pdf")}>
						<img src={GithubIcon} class="long-btn-image" alt="github icon">
						<span>Benchmark report</span>
					</button>
					<button type="button" class="game-button turnip-button"
					        role="link"
					        title="https://github.com/TurnipXenon/C380-1Code/blob/main/Assignment03/DESIGN.md"
					        on:click={() => window.open("https://github.com/TurnipXenon/C380-1Code/blob/main/Assignment03/DESIGN.md")}>
						<img src={GithubIcon} class="long-btn-image" alt="github icon">
						<span>Design</span>
					</button>
				</section>
			</div>
		</section>
	</Card>

	<Card>
		<section class="project-card" slot="content">

			<video playsinline autoplay muted loop preload="none">
				<source src={ThisWebsiteFootage} type="video/mp4">
				video unavailable. original video contains clips of this website being resized and light-dark mode being
				toggled.
			</video>
			<div class="project-card-body">
				<h2>This webpage!</h2>

				<p>
					The webpage is made of two parts. The webpage that has the content for everything here, I've
					lovingly called Seaweed. I kept seaweed as a private package. On the other hand, the base package which I
					want to use for all spin offs of my websites is called Pineapple and have kept that codebase public.
				</p>

				<p>
					<Chip>Svelte</Chip>
					<Chip>Skeleton (Svelte UI library)</Chip>
					<Chip>Typescript</Chip>
					<Chip>Vercel</Chip>
					<Chip>YarnSpinner</Chip>
				</p>

				<section class="game-link-section">
					<button type="button" class="btn variant-filled-primary turnip-button"
					        role="link"
					        title="https://github.com/TurnipXenon/pineapple"
					        on:click={() => window.open("https://github.com/TurnipXenon/pineapple")}>
						<img src={GithubIcon} class="long-btn-image" alt="github icon">
					</button>
				</section>
			</div>
		</section>
	</Card>

	<Card>
		<section class="project-card" slot="content">
			<div class="project-card-body">
				<h2>Mock Uber App</h2>

				<p>A course project app meant to emulate how Uber works by playing with <span
					class="qt-google">Google Maps API</span>.
				</p>
				<p>
					I implemented all interfaces related to the NoSQL cloud database <span
					class="qt-firebase qt-google qt-infra">Firebase</span>, making writing code easier for other programmers
					(<span
					class="qt-android">Android</span> / <span class="qt-java">Java</span>). I also wrote documentation to said
					code and added instrumented tests that are tested by the continuous integration tool <span
					class="qt-infra">Travis CI</span>, ensuring that our code is tested
				</p>

				<section class="game-link-section">
					<!-- todo: mock uber app find link -->
					<button type="button" class="game-button turnip-button"
					        role="link"
					        title="https://github.com/CMPUT301W20T10/UberApp"
					        on:click={() => window.open("https://github.com/CMPUT301W20T10/UberApp")}>
						<img src={GithubIcon} class="long-btn-image" alt="github icon">
					</button>
				</section>
			</div>
		</section>
	</Card>

</section>
