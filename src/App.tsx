import heading from "./app.module.css";
import React from "react";

const App = (num) => (
    <h1 className={heading.heading}>Crocodile With React and TypeScript! {num}</h1>
);

export {App}
