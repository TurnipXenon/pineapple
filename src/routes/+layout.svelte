<script lang="ts">
    import {initializeStores} from '@skeletonlabs/skeleton';
    import '../lib/app.postcss';
    import {Modal} from "@skeletonlabs/skeleton";

    initializeStores();
</script>

<Modal/>

<slot/>
