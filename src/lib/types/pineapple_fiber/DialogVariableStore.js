/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { browser } from "$app/environment";
export const createNewMapStore = () => {
    return browser
        ? localStorage
        : {
            // dumb storage if not in browser
            length: 0,
            setItem: (key, value) => { },
            getItem: (key) => {
                return null;
            },
            clear: () => { },
            key: (index) => {
                return null;
            },
            removeItem: (key) => { }
        };
};
//# sourceMappingURL=DialogVariableStore.js.map