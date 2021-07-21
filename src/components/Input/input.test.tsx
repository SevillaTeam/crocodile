import * as React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import * as ReactDOM from 'react-dom';
import { Input } from '@components/Input';

let container: HTMLDivElement | null = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container as HTMLDivElement);
  container?.remove();
  container = null;
});

describe('Компонент Input', function () {
  it('Атрибут name должен быть email', function () {
    act(() => {
      ReactDOM.render(
        <Input
          name='email'
          placeholder='Email'
          onChange={(): void => {
            console.log('');
          }}
          helpMessage={'errMessage'}
          isError={false}
        />,
        container,
      );
    });
    // @ts-ignore
    expect(container?.querySelector('input')?.getAttribute('name')).toEqual(
      'email',
    );
  });

  it('Атрибут label должен содержать текст Email', function () {
    act(() => {
      ReactDOM.render(
        <Input
          name='email'
          placeholder='Email'
          onChange={(): void => {
            console.log('');
          }}
          helpMessage={'errMessage'}
          isError={false}
        />,
        container,
      );
    });
    // @ts-ignore
    expect(container?.querySelector('label')?.textContent).toEqual('Email');
  });
});
