import type { WrapperProps } from '$pkg/ui/elements';

export interface PinyaCardProps extends WrapperProps {
	paddingClass?: string;
	className?: string;
	flexClass?: string;
	widthClass?: string;
	borderClass?: string;
	marginClass?: string;
	colorClass?: string;
	includeDataNoSnippet?: boolean;
}
