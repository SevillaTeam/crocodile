import React, {FC} from 'react';
import styles from './chat.module.scss';

type Message = {
  id?: string | number,
  content: string,
  nickname?: string,
}

type MessageProps = FC<Message>

const ChatMessage: MessageProps = ({ content }) => {
  return (
    <div className={styles.chatMessage}>
      <div className={styles.messageInfo}>
        <span className={styles.messageSender}>Nickname:</span>
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
  }
]

export const GameChat: FC = (): JSX.Element => {
  const [chatMessages, setChatMessages] = React.useState(messages)

  return (
    <div className={styles.chat}>
      <div className={styles.chatMessages}>
        {chatMessages.map((message, index) => <ChatMessage content={message.content} key={message.content ?? index} /> )}
      </div>
    </div>
  )
}
