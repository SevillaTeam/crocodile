import heading from "./app.module.scss";
import React from "react";
import {Leaderboard} from "./components/Leaderboard";

interface Prop {
    num: number
}

const App = (prop: Prop) => (
    <>
        <Leaderboard/>
    </>
);

export {App}
