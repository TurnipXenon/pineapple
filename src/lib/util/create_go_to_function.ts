export const createGoToFunction = (path: string): (() => void) => {
    return (() => {
        location.href = path;
    });
};
