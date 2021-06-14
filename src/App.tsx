import heading from "./app.module.scss";
import React from "react";
import {Button} from "@app-components/Button"

interface Prop {
    num: number
}

const App = (prop: Prop) => {

    const onClick = () => {
        alert('Hello!')
    }

    return (<>
        <Button size="dense" onClick={onClick}>Standard large</Button>
        <Button onClick={onClick}>Standard</Button>
        <Button size="large" onClick={onClick}>Standard large</Button>
        <Button type="outlined" onClick={onClick}>Outlined</Button>
        <Button type="contained" onClick={onClick}>Contained</Button>
        <Button disabled={true} onClick={onClick}>Disabled</Button>
        <Button color="success" onClick={onClick}>Success</Button>
        <Button color="error" type="contained" onClick={onClick}>Error</Button>
        <h1 className={heading.heading}>Crocodile With React and TypeScript! {prop.num}</h1>
    </>)
};

export {App}
