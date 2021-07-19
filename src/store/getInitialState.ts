import {State} from "./interfaces";
import {RouterState} from "connected-react-router";

export const getInitialState = (): State => {
    return {
        user: undefined,
        userTest: undefined
    };
};
