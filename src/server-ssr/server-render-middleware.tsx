import React from 'react';
import serialize from 'serialize-javascript';
import { renderToStaticMarkup } from 'react-dom/server';
import { Request, Response } from 'express';
import { Provider as ReduxProvider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import { App } from '@/App';
import { getInitialState } from '@/store/getInitialState';
import { configureStore } from '@/store/rootStore';

import { createStoreSingleTone } from '@/store/StoreSingleTone/createStore';

export default (req: Request, res: Response) => {
  // @ts-expect-error
  const { nonce } = req;

  const location = req.url;
  const context: StaticRouterContext = {};
  const StoreSingleTone = createStoreSingleTone(location);
  const store = StoreSingleTone.getStore();

  const jsx = (
    <React.StrictMode>
      <ReduxProvider store={store}>
        <StaticRouter context={context} location={location}>
          <App />
        </StaticRouter>
      </ReduxProvider>
    </React.StrictMode>
  );

  const reactHtml = renderToStaticMarkup(jsx);
  const reduxState = store.getState();

  if (context.url) {
    res.redirect(context.url);
    return;
  }

  res.status(context.statusCode || 200).send(getHtml(reactHtml, reduxState, nonce));
};

function getHtml(reactHtml: string, reduxState = {}, nonce: string) {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="google-site-verification" content="nLL5VlSAgcKL756luG6o6UwKcvR8miU2duRnhU-agmE" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="shortcut icon" type="image/png" href="/images/favicon.png">
            <title>Crocodile game</title>
            <link href="/main.css" rel="stylesheet">
        </head>
        <body>
            <div id="root">${reactHtml}</div>
            <script nonce=${nonce}>
                window.__INITIAL_STATE__ = ${ serialize(reduxState, { isJSON: true }) }
            </script>
            <script nonce=${nonce} src="/main.js"></script>
        </body>
        </html>
    `;
}
