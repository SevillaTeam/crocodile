import React, {FC} from 'react';
import styles from "./chat-input.module.scss";
import {Button} from "@components/Button";
import {IInputState, Input} from "@components/Input";

interface Props {
  sendMessage: (message: string) => void
}

export const ChatInput: FC<Props> = ({sendMessage}) => {

  const submitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendMessage(messageValue)
    setMessageValue('')
  }

  const [messageValue, setMessageValue] = React.useState('')

  const changeMessageValue = ({ value }: IInputState) => {
    setMessageValue(value)
  }

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
