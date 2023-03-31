import React, { useContext, useEffect, useState } from 'react';
import styles from './CalendarMonth.module.scss';
import { daysOfWeek, months } from '../../../constants/dates';
import { DateContext } from '../../../contexts/DateContext';
import cx from 'classnames'
import { useTheme } from '../../../contexts/ThemeContext';
import { style } from '@mui/system';
import { THEME } from '../../../constants/themes';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { getAll } from '../../../api';

const CalendarMonth = () => {
  const { theme } = useTheme();
  const { date,selectedDay,setSelectedDay } = useContext(DateContext);
  const [tasks, setTasks] = useState(new Map());
  // const [, ] = useState(date);
  const [currantDate, setCurrantDate] = useState(date);

  const year = currantDate.getFullYear();
  const month = months[currantDate.getMonth()];

  useEffect(() => {
    getAll()
      .then((data) => {
        const tasksMap = new Map();

        data.forEach((task) => {
          const taskDate = new Date(task.date);
          taskDate.setHours(0, 0, 0, 0);
          const dateString = taskDate.toISOString().split('T')[0];
          if (tasksMap.has(dateString)) {
            tasksMap.get(dateString).push(task);
          } else {
            tasksMap.set(dateString, [task]);
          }
        });
        setTasks(tasksMap);
      })
      .catch((error) => {
        console.error('Произошла ошибка:', error);
      });
  }, []);


  const generateDays = () => {
    const daysInMonth = new Date(year, currantDate.getMonth() + 1, 0).getDate();
    const daysBefore = new Date(year, currantDate.getMonth(), 1).getDay();
    const days = [];

    for (let i = 0; i < daysBefore; i++) {
      days.push(<div key={i} className={cx(styles.day, styles.empty)} />);
    }

    const iterDate = new Date(year, currantDate.getMonth(), 1);

    console.log("tasks" + tasks);
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = iterDate.getTime() === date.setHours(0, 0, 0, 0);
      const isSelected = iterDate.getTime() === selectedDay.setHours(0, 0, 0, 0);
      const dateString = iterDate.toISOString().split('T')[0];
      const hasTasks = tasks.has(dateString) && tasks.get(dateString).length > 0;

      const dayStyle = cx(styles.day, {
        [styles.today]: isToday,
        [styles.dark]: theme === THEME.DARK,
        [styles.selected]: isSelected,
        [styles["has-tasks"]]: hasTasks
      });

      days.push(
        <div key={i + daysBefore} className={dayStyle} onClick={selectDay}>
          {i}
        </div>,
      );

      iterDate.setDate(iterDate.getDate() + 1);
    }
    return days;
  };


  const generateDaysOfWeek = () => {
    return daysOfWeek.short.map((day, index) => (
      <div key={index} className={cx(styles["day-of-week"], day === 'S' ? styles["weekend"] : styles)}>
        {day}
      </div>
    ))
  }

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
  };

  const calendarTheme = cx(styles['calendar-month'], styles[theme]);
  const days = generateDays();
  const renderedDaysOfWeek = generateDaysOfWeek();
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
          {renderedDaysOfWeek}
          {days}
        </div>
      </div>
    </div>
  );
};

export default CalendarMonth;
