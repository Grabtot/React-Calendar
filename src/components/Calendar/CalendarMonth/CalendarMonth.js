import React from 'react';
import styles from './CalendarMonth.module.scss';

const CalendarMonth = () => {
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const date = new Date();
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
          {daysOfWeek.map((day, index) => (
            <div key={index} className={styles['day-of-week']}>
              {day}
            </div>
          ))}
          {days.map((day, index) => (
            <React.Fragment key={index}>{day}</React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarMonth;
