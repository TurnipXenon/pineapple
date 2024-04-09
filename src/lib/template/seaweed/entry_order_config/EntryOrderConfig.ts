export const removeProxyWrapperOnString = (wrapped: string): string => {
	if (!wrapped.includes("Proxy")) {
		return wrapped;
	} else {
		return wrapped.slice("Proxy<".length, wrapped.length - 1);
	}
};