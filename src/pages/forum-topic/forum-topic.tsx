import { Button } from '@/components/Button';
import { ForumMessage } from '@/components/ForumMessage';
import { Input } from '@/components/Input';
import React from 'react';
import { useParams } from 'react-router-dom';
import s from './forum-topic.module.scss';

export const ForumTopic = (): JSX.Element => {
  const { topicId } = useParams<{topicId: string | undefined}>();

  const onMessageTextChange = () => {
    console.log('change message text')
  }

  return (
    <main className={s.forumTopic}>
      <ForumMessage className={s.forumTopicMessage} text="Lorem ipsum coverage" user="12" />
      <div className={s.forumTopicActions}>
        <Input className={s.forumTopicInput} name="Напишите сообщение" onChange={onMessageTextChange} />
        <Button text="Отправить" />
      </div>
    </main>
  );
};
