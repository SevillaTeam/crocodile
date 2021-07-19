import * as React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import * as ReactDOM from 'react-dom';
import { Button } from '@components/Button';
import { Modal } from '@components/Modal';

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

describe('Компонент Modal', function () {
  it('Должен быть отрендерен компонент Button с типом submit', function () {
    act(() => {
      ReactDOM.render(
        <>
          <Modal
            isModalOpen={true}
            onClose={() => {
              console.log('modalClose');
            }}
          >
            <Button type='submit' text='123' />
          </Modal>
        </>,
        container,
      );
    });
    // @ts-ignore
    expect(container?.querySelector('button')?.getAttribute('type')).toEqual(
      'submit',
    );
  });
});
