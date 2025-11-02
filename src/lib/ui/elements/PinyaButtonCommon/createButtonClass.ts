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
	paddingClass ??= buttonVariant === ButtonVariant.Image
		? "pl-3 pr-3 pt-2 pb-2"
		: "pl-3 pr-3";
	colorClass ??= "";
	classes ??= "";

	const chooseTailwindClass = () => {
		switch (colorScheme) {
			case ColorScheme.Custom:
				return colorClass;
			case ColorScheme.Warning:
				return "bg-warning-700 dark:bg-warning-400 text-secondary-0 dark:text-secondary-950 hover:brightness-110";
			case ColorScheme.Surface:
				return "bg-surface-700 dark:bg-surface-600 text-surface-50-950 hover:brightness-110";
			default:
				console.error(`Unimplemented color scheme: ${colorScheme.toString()}`);
			// eslint-disable-next-line no-fallthrough
			case ColorScheme.Primary:
				return "bg-primary-400-600 text-secondary-950 dark:text-secondary-0 hover:brightness-110";
		}
	};

	const tailwindClass = chooseTailwindClass();

	return `btn rounded-2xl text-xl font-bold 
	${buttonVariant === ButtonVariant.SmallIcon ? 'small-icon-button' : ''}
	${tailwindClass} ${paddingClass} ${classes}`;
};
