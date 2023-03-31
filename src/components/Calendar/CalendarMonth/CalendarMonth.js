import React, { useContext, useEffect, useState } from 'react';
import styles from './CalendarMonth.module.scss';
import { daysOfWeek, months } from '../../../constants/dates';
import { DateContext } from '../../../contexts/DateContext';
import cx from 'classnames'
import { useTheme } from '../../../contexts/ThemeContext';
import { THEME } from '../../../constants/themes';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { getAll } from '../../../api';

const CalendarMonth = () => {
  const { theme } = useTheme();
  const { date, selectedTask: selectedDate, setSelectedDate } = useContext(DateContext);
  const [tasks, setTasks] = useState(new Map());
  const [currantDate, setCurrantDate] = useState(date);
  const [selectedDay, setSelectedDay] = useState(new Date());

  const year = currantDate.getFullYear();
  const month = months[currantDate.getMonth()];

  useEffect(() => {
    getAll()
      .then((data) => {
        const tasksMap = new Map();

        data.forEach((task) => {
          const taskDate = new Date(task.date).toLocaleDateString();
          tasksMap.set(taskDate, { ...task, date: taskDate });
        });
        setTasks(tasksMap);
      })
      .catch((error) => {
        console.error('Произошла ошибка:', error);
      });
  }, [selectedDate]);


  const generateDays = () => {
    const daysInMonth = new Date(year, currantDate.getMonth() + 1, 0).getDate();
    const daysBefore = new Date(year, currantDate.getMonth(), 1).getDay();
    const days = [];

    for (let i = 0; i < daysBefore; i++) {
      days.push(<div key={i} className={cx(styles.day, styles.empty)} />);
    }

    const iterDate = new Date(year, currantDate.getMonth(), 1);

    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = iterDate.getTime() === date.setHours(0, 0, 0, 0);
      const isSelected = iterDate.getTime() === selectedDay.setHours(0, 0, 0, 0);

      const dateString = iterDate.toLocaleDateString();
      const hasTasks = tasks.has(dateString);

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
    const newSelectedDay = new Date(currantDate.getFullYear(),
      currantDate.getMonth(), Number(outerText));

    if (tasks.has(newSelectedDay.toLocaleDateString())) {
      setSelectedDate(tasks.get(newSelectedDay.toLocaleDateString()));
    } else {
      setSelectedDate({ date: newSelectedDay.toLocaleDateString(), id: 0, tasks: [] })
    }

    setSelectedDay(newSelectedDay);
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
