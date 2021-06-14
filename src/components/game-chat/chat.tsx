import React, {FC} from 'react';
import styles from './chat.module.scss';

type OwnProps = {
  active: boolean
};

type Props = FC<OwnProps>;

type Message = {
  id?: string | number,
  content: string,
  nickname?: string,
  timestamp: number
}

type MessageProps = FC<Message>

const ChatMessage: MessageProps = ({ content, timestamp }) => {
  return (
    <div className={styles.chatMessage}>
      <div className={styles.messageInfo}>
        <span className={styles.messageSender}>Nickname</span>
        <span>{timestamp}</span>
      </div>
      <span className={styles.messageContent}>{content}</span>
    </div>
  )
}

const messages: Message[] = [
  {
    id: Date.now(),
    content: 'Flower!',
    nickname: 'Nickname',
    timestamp: Date.now()
  }
]

export const GameChat: Props = ({ active }): JSX.Element => {
  const [chatMessages, setChatMessages] = React.useState(messages)

  const submitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const messages = [
      ...chatMessages,
      {
        content: messageValue,
        timestamp: Date.now()
      }
    ]

    setChatMessages(messages)
    setMessageValue('')
  }

  const [messageValue, setMessageValue] = React.useState('')
  const changeMessageValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageValue(e.target.value)
  }

  return (
    <div className={styles.chat}>
      <div className={styles.chatMessages}>
        {chatMessages.map((message, index) => <ChatMessage content={message.content} timestamp={message.timestamp} key={message.timestamp ?? index} /> )}
      </div>
      <div className={styles.chatActions}>
        <form className={styles.chatForm} onSubmit={submitMessage}>
          <input
            value={messageValue}
            onChange={changeMessageValue}
            className={styles.chatInput}
            type="text"
            placeholder="Крокодил"
          />
          <button disabled={!active} type="submit">Отправить</button>
        </form>
      </div>
    </div>
  )
}