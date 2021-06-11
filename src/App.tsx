import heading from './app.module.scss';
import React from 'react';

import { Input } from './components/Input';

interface Prop {
  num: number;
}

const App = (prop: Prop) => (
  <div>
    <h1 className={heading.heading}>
      Crocodile With React and TypeScript! {prop.num}
    </h1>
    <Input
      placeholder='Placeholder'
      type='text'
      id='testIdInput'
      labelText='Placeholder label'
    />
  </div>
);

export { App };
