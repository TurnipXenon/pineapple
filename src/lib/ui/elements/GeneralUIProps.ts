import type { ColorScheme } from './ColorScheme';
import type { OnBackground } from './OnBackground';

export interface GeneralUIProps {
	/**
	 * Color scheme of the UI
	 */
	colorScheme?: ColorScheme;
	/**
	 * Color scheme of the background the UI is on
	 */
	onBackground?: OnBackground;
}