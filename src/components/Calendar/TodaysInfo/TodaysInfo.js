import React from 'react';
import styles from './TodaysInfo.module.scss'

const TodaysInfo = () => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date();
  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate();

  return (
    <div className={styles['current-day']}>
      <div className={styles['day-of-week']}>{dayOfWeek}</div>
      <div className={styles['day-of-month']}>{dayOfMonth}</div>
    </div>
  );
}

export default TodaysInfo;
