<script lang="ts">
	import { type CreateUrlRequest, CreateUrlResult, jsonToCreateUrlResponse } from "$pkg/types/api/CreateUrl";
	import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";

	interface Props {
		queryParams?: string;
	}

	let { queryParams = "" }: Props = $props();

	const toastStore = getToastStore();

	let request: CreateUrlRequest = $state({
		queryParams: "",
		shortUrl: "",
		password: ""
	});

	$effect(() => {
		request.queryParams = queryParams;
	});


	const failToast: ToastSettings = {
		message: "Adding new url failed"
	};
	const toastMap = new Map<CreateUrlResult, ToastSettings>([
		[CreateUrlResult.Success, {
			message: "Successfully added new url"
		}],
		[CreateUrlResult.Duplicate, {
			message: "Short url already used; try again with another url"
		}],
		[CreateUrlResult.Fail, failToast]
	]);
	const post = () => {
		fetch("/api/create-url", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(request)
		}).then(resp =>
			resp.json()
		).then(json => {
			const properResp = jsonToCreateUrlResponse(json);
			toastStore.trigger(toastMap.get(properResp.result) ?? failToast);
		});
	};
</script>

<div class="local-list">
	<label for="short-url">Short URL for url shortener</label>
	<input bind:value={request.shortUrl}
	       name="short-url"
	       class="input"
	       type="text"
	       placeholder="short-url" />
	<label for="password">Password</label>
	<input bind:value={request.password}
	       name="password"
	       class="input"
	       type="password"
	       placeholder="ILoveTurnips" />
	<button class="send-link btn variant-filled" onclick={post}>Send link</button>
</div>

<style>
    .local-list {
        display: flex;
        flex-direction: column;
        gap: 0.25lh;
    }

    .send-link {
        margin-top: 0.75lh;
    }
</style>