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
      placeholder='Placeholder 1'
      type='text'
      id='testIdInput'
      helpMessage='helpMessageText'
      isError={false}
    />
    <p></p>
    <Input
      placeholder='Placeholder 2'
      type='text'
      id='testIdInput'
      helpMessage='Some error occured'
      isError={true}
    />
  </div>
);

export { App };
