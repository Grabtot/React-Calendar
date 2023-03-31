import React, { useContext, useEffect, useState } from 'react';
import styles from './ToDoList.module.scss';
import { DateContext } from '../../../contexts/DateContext';
import { getAll, addNew, update, remove } from '../../../api';

const ToDoList = () => {
  const { selectedTask } = useContext(DateContext);
  const [newTask, setNewTask] = useState('');

  // useEffect(() => {
  //   setTasks(selectedTask.tasks || []);
  // }, [selectedTask]);
  

  const reformatDate = (dateString) => {
    console.log(dateString);
    const [day, month, year] = dateString.split('.');
    const reformattedDate = `${year}-${month}-${day}`;
    console.log(reformattedDate);
    return reformattedDate;
  };

  const createNewTask = async () => {
    if (newTask.trim() === '') return;
    const task = { task: newTask, isDone: false };

    if (!selectedTask.hasOwnProperty('tasks')) {
      const reformattedDate = reformatDate(selectedTask.date);
      const newDate = { ...selectedTask, date: reformattedDate, tasks: [task] };
      await addNew(newDate);
    } else {
      const reformattedDate = reformatDate(selectedTask.date);
      selectedTask.tasks.push(task);
      await update(selectedTask.id, { ...selectedTask, date: reformattedDate });
    }
    setNewTask('');
  };


  const updateTaskStatus = async (index) => {
    const updatedTasks = selectedTask.tasks.map((task, idx) => {
      if (idx === index) {
        return { ...task, isDone: !task.isDone };
      }
      return task;
    });

    const reformattedDate = reformatDate(selectedTask.date);
    const updatedSelectedTask = { ...selectedTask, date: reformattedDate, tasks: updatedTasks };
    await update(selectedTask.id, updatedSelectedTask);
  };


  if (!selectedTask.hasOwnProperty('tasks')) {
    return (
      <div className={styles.todo}>
        <h2>{selectedTask.date.toLocaleDateString()}</h2>
      </div>
    );
  }

  const tasks = selectedTask.tasks.map((task, index) => (
    <li key={index}>
      <label>{task.task}</label>
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={() => updateTaskStatus(index)}
      ></input>
    </li>
  ));

  return (
    <div className={styles.todo}>
      <h2>{selectedTask.date}</h2>
      <ul>{tasks}</ul>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Добавить задачу"
      ></input>
      <button onClick={createNewTask}>Добавить</button>
    </div>
  );
};

export default ToDoList;
