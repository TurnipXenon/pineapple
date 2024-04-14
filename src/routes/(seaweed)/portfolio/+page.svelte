<script>
	import SeaweedTemplate from "$pkg/template/seaweed/SeaweedTemplate.svelte";
	import {
		AllGroupedEntriesProjectFirst,
		GetEntryFromGlobal,
		seaweedTemplateData
	} from "$pkg/template/seaweed/SeaweedTemplateData";
	import WorkExperience from "$pkg/template/seaweed/entries/WorkExperience.svelte";
</script>

<!--todo: maybe add check that this is always false? -->
<SeaweedTemplate
	seaweedTemplateData={seaweedTemplateData}
	projectFirstGroupedEntries={AllGroupedEntriesProjectFirst}
	getEntryFromGlobal={GetEntryFromGlobal}
	experienceSection={WorkExperience}
	letChaos={false}></SeaweedTemplate>
