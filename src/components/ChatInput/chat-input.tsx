import React, { FC, useCallback, useContext } from 'react';
import styles from './chat-input.module.scss';
import { Button } from '@components/Button';
import { IInputState, Input } from '@components/Input';
import cn from 'classnames';
import { ThemeContext } from '@/context';

interface Props {
  sendMessage: (message: string) => void;
}

export const ChatInput: FC<Props> = ({ sendMessage }) => {
  const [messageValue, setMessageValue] = React.useState('');
  const { theme } = useContext(ThemeContext);

  const submitMessage = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      sendMessage(messageValue);
      setMessageValue('');
    },
    [sendMessage, messageValue],
  );

  const changeMessageValue = useCallback(
    ({ value }: IInputState) => {
      setMessageValue(value);
    },
    [setMessageValue],
  );

  return (
    <div className={styles.chatActions}>
      <form
        className={cn(styles.chatForm, styles[theme])}
        onSubmit={submitMessage}
      >
        <Input
          name='Ответ'
          startValue={messageValue}
          onChange={changeMessageValue}
          className={styles.chatInput}
          type='text'
          placeholder='Ответ'
        />
        <Button styleType='contained' type='submit' text='Отправить' />
      </form>
    </div>
  );
};
