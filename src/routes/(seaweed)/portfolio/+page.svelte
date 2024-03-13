<script>
	import SeaweedTemplate from "$pkg/template/SeaweedTemplate.svelte";
	import WebThumbnailImage from "$pkg/assets/placeholder/placeholder_circle.png";

	export let metaWebsite = "https://www.crouton.com/test/portfolio-base-layout";

</script>

<svelte:head>
	<meta charset="utf-8" />
	<title>Welcome to my portfolio</title>
	<meta name="twitter:card" content="summary" />
	<meta property="og:url" content={metaWebsite} />
	<meta property="og:title" content="Turnip" />
	<meta property="og:description" content="Welcome to Turnip's test portfolio website" />
	<meta property="og:image" content={WebThumbnailImage} />
</svelte:head>

<!--todo: maybe add check that this is always false? -->
<SeaweedTemplate letChaos={true}></SeaweedTemplate>
