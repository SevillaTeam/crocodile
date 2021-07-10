import React, { FC } from 'react';
import { FinishNotificationProps } from './';
import styles from "./chat-input.module.scss";
import {Button} from "@components/Button";
import {IInputState, Input} from "@components/Input";

type Props = FinishNotificationProps;

export const ChatInput: FC<Props> = () => {

  const submitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO
  }

  const [messageValue, setMessageValue] = React.useState('')

  const changeMessageValue = ({ value, name }: IInputState) => {
    setMessageValue(value)
  }

  return (
      <div className={styles.chatActions}>
        <form className={styles.chatForm} onSubmit={submitMessage}>
          <Input
              name="Ответ"
              value={messageValue}
              onChange={changeMessageValue}
              className={styles.chatInput}
              type="text"
              placeholder="Ответ"
          />
          <Button styleType="contained" type="submit" text="Отправить"/>
        </form>
      </div>
  );
};
