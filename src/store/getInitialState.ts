import {State} from "./interfaces";
import {RouterState} from "connected-react-router";

export const getInitialState = (pathname = '/'): State => {
    return {
        user: undefined,
        userTest: undefined,
        router: {
            location: { state: '', pathname, search: '', hash: '', key: '' },
            action: 'POP',
        } as RouterState
    };
};
