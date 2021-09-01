import React, { FC, useState, useCallback, MouseEvent } from 'react';
import { Button } from '../Button';
import s from './word-selector.module.scss';
import cn from 'classnames';
import { WORDS } from './mock';

interface ISelectedWordState {
  word: string;
}

interface IWordSelectorProps {
  onClose?: () => void;
}

export const WordSelector: FC<IWordSelectorProps> = (props) => {
  const { onClose } = props;
  const [selectedWord, setSelectedWord] = useState<ISelectedWordState>({
    word: '',
  });

  const onClick = useCallback((e: MouseEvent) => {
    const selectedNode = e.target as HTMLElement;
    const word = selectedNode.textContent;
    setSelectedWord({ word: word || '' });
  }, []);

  const onBtnClick = useCallback(() => {
    if (selectedWord.word) {
      sendWordToServer(selectedWord.word).then((result) => console.log(result));
    }
    if (onClose) onClose();
  }, [selectedWord.word, onClose]);

  const checkSelectedWord = useCallback(
    (currentWord: string) => {
      if (currentWord === selectedWord.word) return true;
      return false;
    },
    [selectedWord.word],
  );

  const sendWordToServer = async (word: string) => {
    try {
      return await fetch('https://sevilla-crocodile-6.ya-praktikum.tech/api/word', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ word }),
      })
        .then((response) => response.json())
        .then((result) => result);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Выберете слово для отгадывания:</h1>
      <div onClick={onClick} className={s.wordsCont}>
        {WORDS.map((item, index) => (
          <p
            key={index}
            className={cn(s.word, {
              [s.word_selected]: checkSelectedWord(item),
            })}
          >
            {item}
          </p>
        ))}
      </div>
      <div className={s.buttons}>
        <Button
          type='button'
          styleType='contained'
          size='dense'
          disabled={!selectedWord.word.length}
          text='Выбрать'
          onClick={onBtnClick}
        />
      </div>
    </div>
  );
};
