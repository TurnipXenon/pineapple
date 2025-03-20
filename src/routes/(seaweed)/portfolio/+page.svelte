<script>
	import SeaweedTemplate from "$pkg/template/seaweed/SeaweedTemplate.svelte";
	import {
		AllGroupedEntriesProjectFirst,
		GetAllEntryFromGlobal,
		GetEntryFromGlobal,
		seaweedTemplateData
	} from "$pkg/template/seaweed/SeaweedTemplateData";
	import WorkExperience from "$pkg/template/seaweed/entries/WorkExperience.svelte";
</script>

<!--todo: maybe add check that this is always false? -->
<SeaweedTemplate
	getAllEntryFromGlobal={GetAllEntryFromGlobal}
	seaweedTemplateData={seaweedTemplateData}
	projectFirstGroupedEntries={AllGroupedEntriesProjectFirst}
	getEntryFromGlobal={GetEntryFromGlobal}
	experienceSection={WorkExperience}
	letChaos={false}></SeaweedTemplate>


<style>
    .side-section {
        display: flex;
        flex-direction: column;
        gap: 1lh;
    }
</style>