import React, { useContext, useEffect, useState } from 'react';
import styles from './ToDoList.module.scss'
import { DateContext } from '../../../contexts/DateContext';
import { getAll } from '../../../api';

const ToDoList = () => {

  const { selectedDay } = useContext(DateContext);
  
  return (
    <div className={styles.todo}>
      <h2>{selectedDay.getFullYear()} {selectedDay.getMonth()} {selectedDay.getDate()}</h2>
    </div>
  );
}

export default ToDoList;