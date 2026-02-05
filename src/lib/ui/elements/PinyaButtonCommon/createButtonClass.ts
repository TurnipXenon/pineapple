import { ColorScheme } from "$pkg/ui/elements/ColorScheme";
import type { PinyaButtonCommonProps } from "./PinyaButtonCommonProps";
import { ButtonVariant } from "./ButtonVariant";

export const createButtonClass = (props: PinyaButtonCommonProps) => {
	let {
		colorScheme,
		paddingClass,
		buttonVariant,
		colorClass,
		classes
	} = props;

	colorScheme ??= ColorScheme.Primary;
	buttonVariant ??= ButtonVariant.Default;
	colorClass ??= "";
	classes ??= "";

	return `btn rounded-2xl text-xl font-bold 
	${buttonVariant === ButtonVariant.SmallIcon ? 'small-icon-button' : ''}
	${colorScheme.toString()}
	${paddingClass} ${classes}`;
};
