import React, { useContext, useEffect, useState } from 'react';
import TaskList from './TasksList/TaskList';
import AddTask from './AddTask/AddTask';
import styles from './ToDoList.module.scss'
import { DateContext } from '../../../contexts/DateContext';
import { addNew, remove, update } from '../../../api';
import { FILTER } from './../../../constants/filters'
import { FilterContext } from '../../../contexts/FilterContext';
import TasksFilter from './TasksFilter/TasksFilter';


const reformatDate = (dateString) => {
  const [day, month, year] = dateString.split('.');
  const reformattedDate = `${year}-${month}-${day}`;
  return reformattedDate;
};

function ToDoList() {
  const { selectedDate, setSelectedDate } = useContext(DateContext);
  const { id: dateId, date, tasks } = selectedDate;
  const [filter, setFilter] = useState(FILTER.ALL);

  const updateDate = async (newDate) => {
    const dbDate = reformatDate(date);
    await update(dateId, { ...newDate, date: dbDate });
    setSelectedDate(newDate);
  }

  const addTask = async (name) => {
    const newTask = { id: 1, task: name, isDone: false }
    if (dateId === 0 || tasks.lenth === 0) {
      let newSelectedDate = { date: reformatDate(date), tasks: [newTask] };
      newSelectedDate = await addNew(newSelectedDate);

      const localeDate = new Date(newSelectedDate.date).toLocaleDateString();
      const newSelectedTask = { ...newSelectedDate, date: localeDate };
      setSelectedDate(newSelectedTask);
    }
    else {
      console.log(tasks);
      const maxId = tasks.reduce((max, task) => {
        return task.id > max ? task.id : max;
      }, -Infinity);
      console.log("max id", maxId);
      console.log("new id", maxId + 1);

      const newSelectedTasks = [...tasks, { ...newTask, id: maxId + 1 }]
      const newSelectedDate = { ...selectedDate, tasks: newSelectedTasks };
      updateDate(newSelectedDate);
    }
  }

  const removeTask = (id) => {
    const tasksWithoutRemovedElement = tasks.filter(task => task.id != id)
    console.log(id);
    console.log(tasks);
    console.log('delete', tasksWithoutRemovedElement);

    if (tasksWithoutRemovedElement.length === 0) {
      console.log('remov');
      remove(dateId);
      setSelectedDate({ id: 0, tasks: [], date: date })
    } else {
      const newSelectedDate = { ...selectedDate, tasks: tasksWithoutRemovedElement };
      updateDate(newSelectedDate);
    }
  }

  const taskDone = async (id) => {
    const newTasks = tasks.map(task => ({
      ...task,
      isDone: task.id === id ? !task.isDone : task.isDone
    }));
    console.log(id);
    console.log("checked: ", newTasks);
    const newSelectedDate = { ...selectedDate, tasks: newTasks };
    updateDate(newSelectedDate);

  }

  const changeName = (id, newName) => {
    const newTasks = tasks.map(task => ({
      ...task,
      task: task.id === id ? newName : task.task
    }));
    console.log(id);
    console.log("change name: ", newTasks);
    const newSelectedDate = { ...selectedDate, tasks: newTasks };
    updateDate(newSelectedDate);
  }

  const filterChanged = (filter) => {
    console.log(filter);
    setFilter(filter);
  }

  return (
    <div id={styles.todo}>
      <FilterContext.Provider value={filter}>
        <h2>{date}</h2>
        <div id={styles['add-task']}>
          <AddTask addTask={addTask} />
          <TasksFilter filterChanged={filterChanged} />
        </div>
        <TaskList tasks={tasks} taskDone={taskDone} removeTask={removeTask} changeName={changeName} />
      </FilterContext.Provider>
    </div>
  );
}

export default ToDoList;

