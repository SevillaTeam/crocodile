import heading from './app.module.scss';
import React from 'react';

interface Prop {
  num: number;
}

const App = (prop: Prop) => (
  <div>
    <h1 className={heading.heading}>
      Crocodile With React and TypeScript! {prop.num}
    </h1>
  </div>
);

export { App };
