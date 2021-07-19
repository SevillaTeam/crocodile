import * as React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import * as ReactDOM from 'react-dom';
import { Button } from '@components/Button';

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

describe('Компонент Button', function () {
  it('Текст кнопки должен быть 123', function () {
    act(() => {
      ReactDOM.render(<Button text='123' />, container);
    });
    // @ts-ignore
    expect(container.textContent).toBe('123');
  });
  it('Тип кнопки должен быть submit', function () {
    act(() => {
      ReactDOM.render(<Button type='submit' text='123' />, container);
    });
    // @ts-ignore
    expect(container?.querySelector('button')?.getAttribute('type')).toEqual(
      'submit',
    );
  });
});
