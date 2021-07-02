import React, { FC } from 'react';
import { connector } from './container';
import { Button } from '../Button';
import s from './test-redux-comp.module.scss';
import { ITestReduxCompProps } from './interfaces';

const TestReduxComp: FC<ITestReduxCompProps> = (props) => {
  const { userId, changeUserId, state } = props;

  const handleClick = () => {
    changeUserId({ id: userId + 1 });
  };

  return (
    <div className={s.container}>
      <p className={s.text}>
        userId from Redux store: <span>{userId}</span>
      </p>
      <div className={s.buttons}>
        <Button
          text='Increment value'
          type='button'
          styleType='contained'
          size='dense'
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default connector(TestReduxComp);
