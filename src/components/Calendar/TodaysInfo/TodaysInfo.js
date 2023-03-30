import React, { useContext } from 'react';
import { daysOfWeek } from '../../../constants/dates';
import { DateContext } from '../../../contexts/DateContext';
import styles from './TodaysInfo.module.scss'

const TodaysInfo = () => {
  const date = useContext(DateContext);
  const dayOfWeek = daysOfWeek.full[date.getDay()];
  const dayOfMonth = date.getDate();

  return (
    <div className={styles['current-day']}>
      <div className={styles['day-of-week']}>{dayOfWeek}</div>
      <div className={styles['day-of-month']}>{dayOfMonth}</div>
    </div>
  );
}

export default TodaysInfo;
