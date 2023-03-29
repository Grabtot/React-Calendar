import React from 'react';
import styles from './Calendar.module.scss';
import CalendarMonth from './CalendarMonth/CalendarMonth';
import TodaysInfo from './TodaysInfo/TodaysInfo';

const Calendar = () => {
  return (
    <div className={styles.calendar}>
      <TodaysInfo />
      <CalendarMonth />
    </div>
  );
};

export default Calendar;
