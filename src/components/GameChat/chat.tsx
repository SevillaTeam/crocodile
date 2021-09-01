import React, {FC} from 'react';
import styles from './chat.module.scss';

type Message = {
  content: string,
  username?: string,
}

type MessageProps = FC<Message>

const ChatMessage: MessageProps = ({ content, username }) => {
  return (
    <div className={styles.chatMessage}>
      <div className={styles.messageInfo}>
        <span className={styles.messageSender}>{username}</span>
      </div>
      <span className={styles.messageContent}>{content}</span>
    </div>
  )
}

interface Messages {
    messages: Message[]
}

export const GameChat: FC<Messages> = ({messages}): JSX.Element => {
  return (
    <div className={styles.chat}>
      <div className={styles.chatMessages}>
        {messages.map((message, index) => <ChatMessage username={message.username} content={message.content} key={message.content + index} /> )}
      </div>
    </div>
  )
}
