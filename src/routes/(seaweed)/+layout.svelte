<script lang="ts">
	import { initializeStores, Toast } from "@skeletonlabs/skeleton";
	import { Modal } from "@skeletonlabs/skeleton";

	initializeStores();
</script>

<Modal />
<Toast />

<slot />
