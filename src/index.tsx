import React from "react";
import ReactDOM from "react-dom";
import {App} from "./App";
import "./styles/_reset"
import "./styles/_fonts"
import "./styles/_global"

ReactDOM.render(
    <React.StrictMode>
        <App num={123}/>
    </React.StrictMode>,
    document.getElementById("root")
);
