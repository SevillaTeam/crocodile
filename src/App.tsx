import heading from "./app.module.css";
import React from "react";

interface Prop {
    num: number
}

const App = (prop: Prop) => (
    <h1 className={heading.heading}>Crocodile With React and TypeScript! {prop.num}</h1>
);

export {App}
