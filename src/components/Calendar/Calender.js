import React from 'react';
import { DateContext } from '../contexts';
import styles from './Calendar.module.scss';
import CalendarMonth from './CalendarMonth/CalendarMonth';
import TodaysInfo from './TodaysInfo/TodaysInfo';

const Calendar = () => {
  return (
    <div className={styles.calendar}>
      <DateContext.Provider value={new Date()}>
        <TodaysInfo />
        <CalendarMonth />
      </DateContext.Provider>
    </div>
  );
};

export default Calendar;
