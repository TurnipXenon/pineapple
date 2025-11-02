<!-- TODO: Migration: review and migrate this component -->

<script lang="ts">
	import { type CreateUrlRequest, CreateUrlResult, jsonToCreateUrlResponse } from "$pkg/types/api/CreateUrl";
	// import type { ToastContext } from "@skeletonlabs/skeleton-svelte";
	import { getContext } from "svelte";
	import type { ToastSettings } from "./ToastSettings";
	import PinyaButton from "$pkg/ui/elements/PinyaButton/PinyaButton.svelte";

	// export const toast: ToastContext = getContext("toast");


	interface Props {
		queryParams?: string;
	}

	let { queryParams = "" }: Props = $props();

	let request: CreateUrlRequest = $state({
		queryParams: "",
		shortUrl: "",
		password: ""
	});

	$effect(() => {
		request.queryParams = queryParams;
	});


	const failToast: ToastSettings = {
		title: "Adding new url failed",
		type: "error"
	};
	const toastMap = new Map<CreateUrlResult, ToastSettings>([
		[CreateUrlResult.Success, {
			title: "Successfully added new url"
		}],
		[CreateUrlResult.Duplicate, {
			title: "Short url already used; try again with another url"
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
			// todo: toast
			// toast.create(toastMap.get(properResp.result) ?? failToast);
		});
	};
</script>

<div class="local-list">
	<label for="short-url">Short URL for url shortener</label>
	<input bind:value={request.shortUrl}
	       name="short-url"
	       class="input border-[2px] border-primary-500"
	       type="text"
	       placeholder="short-url" />
	<label for="password">Password</label>
	<input bind:value={request.password}
	       name="password"
	       class="input border-[2px] border-primary-500"
	       type="password"
	       placeholder="ILoveTurnips" />
	<PinyaButton onclick={post}>Send link</PinyaButton>
</div>

<style>
    .local-list {
        display: flex;
        flex-direction: column;
        gap: 0.5lh;
		    margin-top: 1lh;
    }
</style>
