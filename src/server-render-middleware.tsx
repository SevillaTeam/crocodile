import React from 'react';
import {renderToString} from 'react-dom/server';
import {Request, Response} from 'express';
import {StaticRouter} from 'react-router-dom';
import {StaticRouterContext} from 'react-router';
import {App} from './App';
import {Home} from "@/pages";

const css: { [key: string]: any }[] = []

export default (req: Request, res: Response) => {
    const location = req.url;
    const context: StaticRouterContext = {};

    const jsx = (
        // <StaticRouter context={context} location={location}>
        //     <App/>
            <Home/>
        // </StaticRouter>
    );

    const reactHtml = renderToString(jsx);
    if (context.url) {
        res.redirect(context.url);
        return;
    }
    console.log(css)

    res
        .status(context.statusCode || 200)
        .send(getHtml(reactHtml));
};

function getHtml(reactHtml: string) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="shortcut icon" type="image/png" href="/images/favicon.jpg">
        <title>Sneakers shop</title>
        <link rel="stylesheet" href="/main.css"/>
    </head>
    <body>
        <div id="root">${reactHtml}</div>
        <script src="/main.js"></script>
    </body>
    </html>
    `;
}
