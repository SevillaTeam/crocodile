import {configureStore} from "@/store/rootStore";
import {getInitialState} from "@/store/getInitialState";

export const store = configureStore(getInitialState()).store
