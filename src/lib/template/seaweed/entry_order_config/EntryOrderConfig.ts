export const removeProxyWrapperOnString = (wrapped: string): string => {
	return wrapped.slice("Proxy<".length, wrapped.length - 1);
};