<script lang="ts">
    import FABIcon from "$lib/assets/bg_tiled/bg_tiled_turnip.png";
    import SeaweedBaseLayout from "$lib/components/SeaweedBaseLayout.svelte";
    import {Accordion, AccordionItem} from "@skeletonlabs/skeleton";
    import {onMount} from "svelte";
    import StickySeparatorElement from "$lib/components/StickySeparatorElement.svelte";

    let elemMovies: HTMLDivElement;
    let stickyElem: HTMLElement;
    let elemCarousel: HTMLDivElement;
    let isSocialSticky = false;
    const unsplashIds = ['vjUokUWbFOs', '1aJuPtQJX_I', 'Jp6O3FFRdEI', 'I3C_eojFVQY', 's0fXOuyTH1M', 'z_X0PxmBuIQ'];

    function carouselLeft(): void {
        const x =
            elemCarousel.scrollLeft === 0
                ? elemCarousel.clientWidth * elemCarousel.childElementCount // loop
                : elemCarousel.scrollLeft - elemCarousel.clientWidth; // step left
        elemCarousel.scroll(x, 0);
    }

    function carouselRight(): void {
        const x =
            elemCarousel.scrollLeft === elemCarousel.scrollWidth - elemCarousel.clientWidth
                ? 0 // loop
                : elemCarousel.scrollLeft + elemCarousel.clientWidth; // step right
        elemCarousel.scroll(x, 0);
    }

    function carouselThumbnail(index: number) {
        elemCarousel.scroll(elemCarousel.clientWidth * index, 0);
    }

    function multiColumnLeft(): void {
        let x = elemMovies.scrollWidth;
        if (elemMovies.scrollLeft !== 0) x = elemMovies.scrollLeft - elemMovies.clientWidth;
        elemMovies.scroll(x, 0);
    }

    function multiColumnRight(): void {
        let x = 0;
        // -1 is used because different browsers use different methods to round scrollWidth pixels.
        if (elemMovies.scrollLeft < elemMovies.scrollWidth - elemMovies.clientWidth - 1) x = elemMovies.scrollLeft + elemMovies.clientWidth;
        elemMovies.scroll(x, 0);
    }

    let observer: undefined | IntersectionObserver;
    onMount(() => {
        observer = new IntersectionObserver(
            ([e]) => {
                isSocialSticky = e.intersectionRatio < 1;
            },
            {threshold: [1]}
        );
        observer.observe(stickyElem);
    });
</script>

<button type="button" class="btn-icon variant-filled fab">
	<img src={FABIcon} alt="interactable floating action button represented as a turnip">
</button>

<SeaweedBaseLayout>
	<main>

		<section>
			<h1>About</h1>

			Hi! My name is Turnip! I work as a software developer. Outside of that, I like making games, and
			trying to do everything in between required to make one. I have some showcased below, our visit my itch.io
			page for more of them.<br>
			I'm inspired by games like Harvest Moon: Friends of Mineral Town, Rune Factory 4, Theatrhythm,
			Bravely Default: Flying Fairy, Boku no Natsuyasumi 2, and A Short Hike.

		</section>
		<section bind:this={stickyElem} class="socials">
			email: <a href="mailto:turnipxenon@gmail.com">turnipxenon@gmail.com</a>
			<StickySeparatorElement isSticky={isSocialSticky}></StickySeparatorElement>
			github: <a href="https://github.com/TurnipXenon" target="_blank">github.com/TurnipXenon</a>
			<StickySeparatorElement isSticky={isSocialSticky}></StickySeparatorElement>
			itch: <a href="https://turnipxenon.itch.io/" target="_blank">github.com/TurnipXenon</a>
			<StickySeparatorElement isSticky={isSocialSticky}></StickySeparatorElement>
			linkedin: <a href="https://www.linkedin.com/in/turnip-xenon/"
			             target="_blank">linkedin.com/in/turnip-xenon</a>
		</section>

		<section>
			<h1>Experience</h1>

			<h2>Software Engineer I, L4</h2>
			<p>July 2023 – January 2024</p>
			<p>Twitch, Remote</p>
			<ul>
				<li>Contributed to Golang and Typescript codebases, across several teams, to accommodate adjustments for
					public-facing user safety related features, in preparation for complying with EU’s
					<a href="https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/europe-fit-digital-age/digital-services-act/europe-fit-digital-age-new-online-rules-platforms_en"
					   target="_blank">Digital Services</a>
					Act, also including feature flags, alarms, unit tests, end-to-end testing, and documentation
				</li>
				<li>Improved observability for upcoming features by setting up new AWS resources to integrate internal
					data platform tools with existing alarms in our team’s microservice, utilizing Cloudwatch and
					Kinesis Data Stream, while adhering to best practices for AWS CDK (infrastructure as code)
				</li>
			</ul>

			<h2>Software Engineer Intern</h2>
			<p>May 2022 – Aug 2022</p>
			<p>Twitch, San Francisco</p>
			<ul>
				<li>
					Built a load testing service that can be configured to generate different message types at different
					volumes
					that can be easily extended to target different chat services
				</li>
				<li>
					Used Twitch’s set of custom tools, including Twitch’s custom RPC protocol, to create a backend
					service with
					business logic written in Go and cloud infrastructure utilizing ECS on Fargate, Cloudwatch, and
					DynamoDB,
					defined in Typescript-flavored CDK
				</li>
				<li>
					Wrote a technical specification document for the service’s MVP and possible future features, and
					additional
					documentation on how to use the service and how to extend the load testing service to include new
					services
					to test
				</li>
			</ul>


			<Accordion>
				<AccordionItem>
					<!--					<svelte:fragment slot="lead">(icon)</svelte:fragment>-->
					<svelte:fragment slot="summary">More previous experience</svelte:fragment>
					<svelte:fragment slot="content">
						<section>
							<h2>Software Engineer Intern</h2>
							<p>May 2021 – Dec 2021</p>
							<p>Twitch / Amazon Web Services Canada, Remote</p>
							<ul>
								<li>
									Implemented and wrote tests for a feature in Twitch’s backend authentication systems
									and frontend web application that will help suggest security improvements to over
									hundreds of thousands of users daily
								</li>
								<li>
									Learned Go, Typescript, React, and other new technologies on the go to contribute to
									the codebase
								</li>
							</ul>
						</section>
					</svelte:fragment>
				</AccordionItem>
			</Accordion>
		</section>


		<section>
			<h1>Games</h1>

			<div class="card p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center">
				<!-- Button: Left -->
				<button type="button" class="btn-icon variant-filled" on:click={carouselLeft}>
					<i class="fa-solid fa-arrow-left"/>
				</button>
				<!-- Full Images -->
				<div bind:this={elemCarousel} class="snap-x snap-mandatory scroll-smooth flex overflow-x-auto">
					{#each unsplashIds as unsplashId}
						<img
								class="snap-center w-[1024px] rounded-container-token"
								src="https://source.unsplash.com/{unsplashId}/1024x768"
								alt={unsplashId}
								loading="lazy"
						/>
					{/each}
				</div>
				<!-- Button: Right -->
				<button type="button" class="btn-icon variant-filled" on:click={carouselRight}>
					<i class="fa-solid fa-arrow-right"/>
				</button>
			</div>

			<div class="card p-4 grid grid-cols-6 gap-4">
				{#each unsplashIds as unsplashId, i}
					<button type="button" on:click={() => carouselThumbnail(i)}>
						<img
								class="rounded-container-token"
								src="https://source.unsplash.com/{unsplashId}/256x256"
								alt={unsplashId}
								loading="lazy"
						/>
					</button>
				{/each}
			</div>

		</section>

		<section>
			<h1>Projects</h1>

			<div class="card p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center">
				<!-- Button: Left -->
				<button type="button" class="btn-icon variant-filled" on:click={carouselLeft}>
					<i class="fa-solid fa-arrow-left"/>
				</button>
				<!-- Full Images -->
				<div bind:this={elemCarousel} class="snap-x snap-mandatory scroll-smooth flex overflow-x-auto">
					{#each unsplashIds as unsplashId}
						<img
								class="snap-center w-[1024px] rounded-container-token"
								src="https://source.unsplash.com/{unsplashId}/1024x768"
								alt={unsplashId}
								loading="lazy"
						/>
					{/each}
				</div>
				<!-- Button: Right -->
				<button type="button" class="btn-icon variant-filled" on:click={carouselRight}>
					<i class="fa-solid fa-arrow-right"/>
				</button>
			</div>

			<div class="card p-4 grid grid-cols-6 gap-4">
				{#each unsplashIds as unsplashId, i}
					<button type="button" on:click={() => carouselThumbnail(i)}>
						<img
								class="rounded-container-token"
								src="https://source.unsplash.com/{unsplashId}/256x256"
								alt={unsplashId}
								loading="lazy"
						/>
					</button>
				{/each}
			</div>

		</section>

		<section>
			<h2>Education</h2>
			BS Computing Science, Specialization in Software Practice June 2023
			With Certificate in Computer Game Development
			University of Alberta
		</section>

	</main>
</SeaweedBaseLayout>

<style>
    main {
        overflow: visible;
    }

    /*todo: consider left handedness or customizability*/
    .fab {
        position: fixed;
        height: 5em;
        width: 5em;
        bottom: 3em;
        right: 2em;
        box-shadow: 0.5em 0.5em 0.5em gray;
    }

    .socials {
        position: sticky;
        top: -1px;
    }

    /*might need to move to apppost.css*/
    .socials.isSticky {
        font-size: 2rem;
        color: red;
        border-bottom: 1px solid black;
    }


    .fab img {
        object-fit: contain;
    }
</style>