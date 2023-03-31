import React, { useContext, useEffect, useState } from 'react';
import styles from './ToDoList.module.scss'
import { DateContext } from '../../../contexts/DateContext';
import { getAll } from '../../../api';

const ToDoList = () => {
  const { selectedTask } = useContext(DateContext);

  if (!selectedTask.hasOwnProperty("tasks")) {
    console.log(selectedTask);
    return (<div className={styles.todo}>
      <h2>{selectedTask.date.toLocaleDateString()}</h2>
    </div>);
  }

  const taskDone = ({ target: value }) => { }
  const tasks = selectedTask.tasks.map(task => <li key={task.id}>
    <label>{task.task}</label>
    <input type='checkbox' value={task.isDone} onChange={taskDone}></input>
  </li>)

  return (
    <div className={styles.todo}>
      <h2>{selectedTask.date}</h2>
      <ul>{tasks}</ul>
    </div>
  );
}

export default ToDoList;