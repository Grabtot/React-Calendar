import React, { useContext, useState } from 'react';
import styles from './CalendarMonth.module.scss';
import { daysOfWeek, months } from '../../../constants/dates';
import { DateContext } from '../../../contexts/DateContext';
import cx from 'classnames'
import { useTheme } from '../../../contexts/ThemeContext';
import { style } from '@mui/system';
import { THEME } from '../../../constants/themes';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const CalendarMonth = () => {
  const { theme } = useTheme();
  const date = useContext(DateContext);
  const [selectedDay, setSelectedDay] = useState(date);
  const [currantDate, setCurrantDate] = useState(date);

  const year = currantDate.getFullYear();
  const month = months[currantDate.getMonth()];
  const daysInMonth = new Date(year, currantDate.getMonth() + 1, 0).getDate();
  const daysBefore = new Date(year, currantDate.getMonth(), 1).getDay();
  const days = [];

  const selectDay = ({ target: { outerText } }) => {
    setSelectedDay(new Date(currantDate.getFullYear(), currantDate.getMonth(), Number(outerText)));
  }

  const changeDate = ({ currentTarget: { id } }) => {
    const newDate = new Date(currantDate);
    switch (id) {
      case 'next':
        newDate.setMonth(newDate.getMonth() + 1);
        setCurrantDate(newDate);
        break;

      case 'prev':
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrantDate(newDate);
        break;
      default:
        alert("Error!");
        break;
    }
    console.log(newDate);
  };


  for (let i = 0; i < daysBefore; i++) {
    days.push(<div key={i} className={styles.day + ' ' + styles.empty} />);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = i === date.getDate() &&
      currantDate.getMonth() === date.getMonth() &&
      date.getFullYear() === currantDate.getFullYear() ? styles.today : style.empty;
    const isSelected = i === selectedDay.getDate() &&
      selectedDay.getMonth() === currantDate.getMonth() &&
      selectedDay.getFullYear() === currantDate.getFullYear() ? styles.selected : style.empty;
    const dayStyle = cx(styles.day, {
      [styles.today]: isToday,
      [styles.dark]: theme === THEME.DARK,
      [styles.selected]: isSelected
    });

    days.push(
      <div key={i + daysBefore} className={dayStyle} onClick={selectDay}>
        {i}
      </div>,
    );
  }



  const calendarTheme = cx(styles['calendar-month'], styles[theme]);

  return (
    <div className={calendarTheme}>
      <div className={styles.month}>{month}</div>
      <div className={styles.year}>{year}</div>
      <div className={styles['nav-buttons']}>
        <NavigateBeforeIcon fontSize='large' id='prev' className={styles.button} onClick={changeDate} />
        <NavigateNextIcon fontSize='large' id='next' className={styles.button} onClick={changeDate} />
      </div>
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
