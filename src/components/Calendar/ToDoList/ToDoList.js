import React, { useContext, useState } from 'react';
import TaskList from './TasksList/TaskList';
import AddTask from './AddTask/AddTask';
import styles from './ToDoList.module.scss'
import { DateContext } from '../../../contexts/DateContext';
// import { FilterContext } from '../../context';

function ToDoList() {
  const { selectedDate, setSelectedDate } = useContext(DateContext);
  const { id, date, tasks } = selectedDate;
  // const [filter, setFilter] = useState(FILTER.ALL);

  const addTask = (name) => {
    const newTasks = [
      ...tasks, {
        id: tasks.length,
        name,
        done: false
      }];
    // setTasks(newTasks);
  }

  const removeTask = (id) => {
    const arrWithoutRemovedElement = tasks.slice(0, id).concat(tasks.slice(id + 1));
    // setTasks(arrWithoutRemovedElement);
  }

  const taskDone = (id) => {
    const newTasks = tasks.map(task => ({
      ...task,
      done: task.id === id ? !task.done : task.done
    }));
    // setTasks(newTasks);
  }

  const changeName = (id, name) => {
    const newTasks = tasks.map(task => ({
      ...task,
      name: task.id == id ? name : task.name
    }));
    // setTasks(newTasks);
  }

  // const filterChanged = (filter) => {
  //   setFilter(filter);
  // }


  return (
    <div className={styles.todo}>
      {/* <FilterContext.Provider value={filter}> */}
      <div>
        <h2>{date}</h2>
        <AddTask addTask={addTask} />
        {/* <FilterTask filterChanged={filterChanged} /> */}
      </div>
      <TaskList tasks={tasks} taskDone={taskDone} removeTask={removeTask} changeName={changeName} />
      {/* </FilterContext.Provider> */}
    </div>
  );
}

export default ToDoList;

