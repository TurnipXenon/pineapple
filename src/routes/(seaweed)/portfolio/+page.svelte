<script>
	import SeaweedTemplate from "$pkg/template/seaweed/SeaweedTemplate.svelte";
	import {
		AllGroupedEntriesProjectFirst,
		GetEntryFromGlobal,
		seaweedTemplateData
	} from "$pkg/template/seaweed/SeaweedTemplateData";
</script>

<!--todo: maybe add check that this is always false? -->
<SeaweedTemplate
	seaweedTemplateData={seaweedTemplateData}
	projectFirstGroupedEntries={AllGroupedEntriesProjectFirst}
	getEntryFromGlobal={GetEntryFromGlobal}
	letChaos={true}></SeaweedTemplate>
