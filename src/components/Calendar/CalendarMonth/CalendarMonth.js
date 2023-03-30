import React, { useContext, useState } from 'react';
import styles from './CalendarMonth.module.scss';
import { daysOfWeek, months } from '../../../constants/dates';
import { DateContext } from '../../../contexts/DateContext';
import cx from 'classnames'
import { useTheme } from '../../../contexts/ThemeContext';
import { style } from '@mui/system';
import { THEME } from '../../../constants/themes';

const CalendarMonth = () => {
  const [selectedDay, setSelectedDay] = useState();

  const { theme } = useTheme();
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
    const isToday = i === date.getDate() ? styles.today : style.empty;
    const isSelected = i === selectedDay ? styles.selected : style.empty;
    const dayStyle = cx(styles.day, {
      [styles.today]: isToday,
      [styles.dark]: theme === THEME.DARK,
      [styles.selected]: isSelected
    });

    const handleClick = (e) => {
      setSelectedDay(Number(e.target.outerText));
    }

    days.push(
      <div key={i + daysBefore} className={dayStyle} onClick={handleClick}>
        {i}
      </div>,
    );
  }



  const calendarTheme = cx(styles['calendar-month'], styles[theme]);

  return (
    <div className={calendarTheme}>
      <div className={styles.month}>{month}</div>
      <div className={styles.year}>{year}</div>
      <div className={styles.days}>
        <div className={styles['days-container']}>
          {daysOfWeek.short.map((day, index) => (
            <div key={index} className={cx(styles["day-of-week"], day === 'S' ? styles["weekend"] : styles)}>
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
