import React from 'react';
import s from './forum-message.module.scss';
import { ForumMessageProps } from './types';

const ForumMessage: React.FC<ForumMessageProps> = ({
  text,
  className
}) => (
  <div className={`${s.forumMessage} ${className}`}>
    <p className={s.forumText}>{ text }</p>
  </div>
);

export { ForumMessage };
