import React, { useContext, useEffect, useState } from 'react';
import styles from './ToDoList.module.scss';
import { DateContext } from '../../../contexts/DateContext';
import { addNew, update } from '../../../api';

const ToDoList = () => {
  const { selectedTask, setTask } = useContext(DateContext);
  const [newTask, setNewTask] = useState('');

  // Функция для преобразования даты в нужный формат
  const reformatDate = (dateString) => {
    const [day, month, year] = dateString.split('.');
    const reformattedDate = `${year}-${month}-${day}`;
    return reformattedDate;
  };

  // Функция для создания новой задачи
  const createNewTask = async () => {
    if (newTask.trim() === '') return;
    const task = { task: newTask, isDone: false };
    if (!selectedTask.hasOwnProperty('id')) {
      const reformattedDate = reformatDate(selectedTask.date);
      const newDate = { ...selectedTask, date: reformattedDate, tasks: [task] };
      await addNew(newDate);
    } else {

      const reformattedDate = reformatDate(selectedTask.date);
      const updatedTasks = [...selectedTask.tasks, task];
      const updatedSelectedTask = { ...selectedTask, tasks: updatedTasks };
      await update(selectedTask.id, { ...updatedSelectedTask, date: reformattedDate });
      setTask(updatedSelectedTask);
    }
    setNewTask('');
  };

  // Функция для обновления статуса задачи
  const updateTaskStatus = async (taskId) => {
    const updatedTasks = [...selectedTask.tasks];
    const updatedTask = updatedTasks[taskId];
    updatedTask.isDone = !updatedTask.isDone;
    updatedTasks[taskId] = updatedTask;
    const updatedSelectedTask = { ...selectedTask, tasks: updatedTasks };
    const reformattedDate = reformatDate(selectedTask.date);
    await update(selectedTask.id, { ...updatedSelectedTask, date: reformattedDate });
    setTask(updatedSelectedTask);
  };

  // Отображение компонента
  if (!selectedTask.hasOwnProperty('id')) {
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
      />
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
      />
      <button onClick={createNewTask}>Добавить</button>
    </div>
  );
};

export default ToDoList;
