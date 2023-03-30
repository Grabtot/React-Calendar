import React, { useContext } from 'react';
import { daysOfWeek } from '../../../constants/dates';
import { DateContext } from '../../../contexts/DateContext';
import styles from './TodaysInfo.module.scss'
import cx from 'classnames'
import { useTheme } from '../../../contexts/ThemeContext';

const TodaysInfo = () => {
  const date = useContext(DateContext);
  const dayOfWeek = daysOfWeek.full[date.getDay()];
  const dayOfMonth = date.getDate();

  const { theme } = useTheme();
  const themeClass = cx(styles['current-day'], styles[theme]);

  return (
    <div className={themeClass}>
      <div className={styles['day-of-week']}>{dayOfWeek}</div>
      <div className={styles['day-of-month']}>{dayOfMonth}</div>
    </div>
  );
}

export default TodaysInfo;
