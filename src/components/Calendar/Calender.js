import React from 'react';
import { DateContext } from '../../contexts/DateContext';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './Calendar.module.scss';
import CalendarMonth from './CalendarMonth/CalendarMonth';
import TodaysInfo from './TodaysInfo/TodaysInfo';
import cx from 'classnames';

const Calendar = () => {
  const { theme } = useTheme();

  const calendarStyle = cx(styles.calendar, styles[theme])
  return (
    <div className={calendarStyle}>
      <DateContext.Provider value={new Date()}>
        <TodaysInfo />
        <CalendarMonth />
      </DateContext.Provider>
    </div>
  );
};

export default Calendar;
