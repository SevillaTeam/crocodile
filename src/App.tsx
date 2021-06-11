import heading from './app.module.scss';
import React from 'react';

import { Input, IInputState } from './components/Input';

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
      name='lal'
      helpMessage='helpMessageText'
      isError={false}
      onChange={({ value, name }: IInputState) =>
        console.log('name= value=', name, value)
      }
    />
    <p></p>
    <Input
      placeholder='Placeholder 2'
      type='text'
      name='lal2'
      onChange={({ value, name }: IInputState) =>
        console.log('name= value=', name, value)
      }
      helpMessage='Some error occured'
      isError={true}
    />
  </div>
);

export { App };
