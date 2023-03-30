import React, { useContext } from 'react';
import styles from './CalendarMonth.module.scss';
import { daysOfWeek, months } from '../../../constants/dates';
import { DateContext } from '../../../contexts/DateContext';

const CalendarMonth = () => {
  const date = useContext(DateContext);
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const daysInMonth = new Date(year, date.getMonth() + 1, 0).getDate();
  const daysBefore = new Date(year, date.getMonth(), 1).getDay();
  const days = [];

  for (let i = 0; i < daysBefore; i++) {
    days.push(<div key={i} className={styles.day + ' ' + styles.empty} />);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = i === date.getDate() ? styles.today : '';
    days.push(
      <div key={i} className={styles.day + ' ' + isToday}>
        {i}
      </div>,
    );
  }

  return (
    <div className={styles['calendar-month']}>
      <div className={styles.month}>{month}</div>
      <div className={styles.year}>{year}</div>
      <div className={styles.days}>
        <div className={styles['days-container']}>
          {daysOfWeek.short.map((day, index) => (
            <div key={index} className={styles['day-of-week']}>
              {day}
            </div>
          ))}
          {days}
        </div>
      </div>
    </div>
  );
};

export default CalendarMonth;
