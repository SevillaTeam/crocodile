import React, {FC, useCallback} from 'react';
import styles from "./chat-input.module.scss";
import {Button} from "@components/Button";
import {IInputState, Input} from "@components/Input";

interface Props {
  sendMessage: (message: string) => void
}

export const ChatInput: FC<Props> = ({sendMessage}) => {

  const [messageValue, setMessageValue] = React.useState('')

  const submitMessage = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendMessage(messageValue)
    setMessageValue('')
  }, [sendMessage, messageValue])

  const changeMessageValue = useCallback(({ value }: IInputState) => {
    setMessageValue(value)
  }, [setMessageValue])

  return (
      <div className={styles.chatActions}>
        <form className={styles.chatForm} onSubmit={submitMessage}>
          <Input
              name="Ответ"
              startValue={messageValue}
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
