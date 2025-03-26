// from node_modules/@skeletonlabs/skeleton-svelte/dist/components/Toast/types.d.ts
export interface ToastSettings {
	/** The unique toast ID. */
	id?: string;
	/** The unique toast title text. */
	title?: string;
	/** The unique toast description text. */
	description?: string;
	/**
	 * Define the toast type.
	 * @default info
	 */
	type?: "info" | "error" | "success";
	/** The duration of the toast. Default varies by type. */
	duration?: number;
}
