import React, { useState } from 'react';
import { DateContext } from '../../contexts/DateContext';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './Calendar.module.scss';
import CalendarMonth from './CalendarMonth/CalendarMonth';
import TodaysInfo from './TodaysInfo/TodaysInfo';
import cx from 'classnames';
import ToDoList from './ToDoList/ToDoList';

const Calendar = () => {
  const { theme } = useTheme();
  const [selectedDay, setSelectedDay] = useState(new Date());
  const calendarStyle = cx(styles.calendar, styles[theme])
  return (
    <div className={calendarStyle}>
      <DateContext.Provider value={{ date: new Date(), selectedDay: selectedDay, setSelectedDay: setSelectedDay }}>
        <TodaysInfo />
        <CalendarMonth />
        <ToDoList />
      </DateContext.Provider>
    </div>
  );
};

export default Calendar;
