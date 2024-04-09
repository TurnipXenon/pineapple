<script lang="ts">
	import { type CreateUrlRequest, CreateUrlResult, jsonToCreateUrlResponse } from "$pkg/types/api/CreateUrl";
	import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";

	export let queryParams = "";

	const toastStore = getToastStore();

	let request: CreateUrlRequest = {
		queryParams: "",
		shortUrl: "",
		password: ""
	};
	$: request.queryParams = queryParams;

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

<div>
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
	<br>
	<br>
	<button class="btn variant-filled" on:click={post}>Send link</button>
</div>
