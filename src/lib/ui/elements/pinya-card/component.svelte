<script lang="ts">/**
* When with texts, wrap the text content inside a div so flex wont apply
*/
	import type { PinyaCardProps } from './props';

	let {
	paddingClass = 'pt-[1lh] pb-[1lh] pl-16 pr-16',
	flexClass = 'flex flex-col',
	widthClass = 'max-w-md',
	className,
	children
}: PinyaCardProps = $props();
</script>

<div
	class={`card bg-surface-200 dark:bg-surface-900 border-[2px] border-primary-500 dark:border-0 w-full text-start rounded-xl ${paddingClass} ${flexClass} ${className} ${widthClass}`}
>
	{@render children?.()}
</div>