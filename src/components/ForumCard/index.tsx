import React from 'react';
import { Link } from 'react-router-dom';
import s from './forum-card.module.scss';
import { ForumCardProps } from './types';

const ForumCard: React.FC<ForumCardProps> = ({
  title,
  messagesCount,
  lastDate,
  className,
  topicId
}) => (
  <Link to={`/forum/${topicId}`}>
    <div className={`${s.forumCard} ${className}`}>
      <div className={s.cardInfo}>
        <div>Тема</div>
        <p className={s.cardTitle}>{ title }</p>
      </div>
      <div className={s.cardInfo}>
        <p className={`${s.cardTitle} ${s.cardMessageCount}`}>Сообщений { messagesCount }</p>
        <p>Последнее сообщение { lastDate }</p>
      </div>
    </div>
  </Link>
);

export { ForumCard };
