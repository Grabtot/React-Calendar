import React, { useContext, useEffect } from 'react';
import TaskList from './TasksList/TaskList';
import AddTask from './AddTask/AddTask';
import styles from './ToDoList.module.scss'
import { DateContext } from '../../../contexts/DateContext';
import { addNew, update } from '../../../api';
// import { FilterContext } from '../../context';


const reformatDate = (dateString) => {
  const [day, month, year] = dateString.split('.');
  const reformattedDate = `${year}-${month}-${day}`;
  return reformattedDate;
};
function ToDoList() {
  const { selectedDate, setSelectedDate } = useContext(DateContext);
  const { id, date, tasks } = selectedDate;

  console.log(id);
  console.log(date);
  console.log(tasks);

  const updateDate = async (newDate) => {
    const dbDate = reformatDate(date);
    await update(id, { ...newDate, date: dbDate });
    setSelectedDate(newDate);
  }

  const addTask = async (name) => {
    // console.log(tasks);
    const newTask = { id: tasks.length + 1, task: name, isDone: false }
    if (id === 0) {
      let newSelectedDate = { date: reformatDate(date), tasks: [newTask] };
      newSelectedDate = await addNew(newSelectedDate);

      const localeDate = new Date(newSelectedDate.date).toLocaleDateString();
      const newSelectedTask = { ...newSelectedDate, date: localeDate };
      setSelectedDate(newSelectedTask);
    }
    else {
      const newSelectedTasks = [...tasks, newTask]
      const newSelectedDate = { ...selectedDate, tasks: newSelectedTasks };
      updateDate(newSelectedDate);
    }

  }

  const removeTask = (id) => {
    // const arrWithoutRemovedElement = tasks.slice(0, id).concat(tasks.slice(id + 1));
    // setTasks(arrWithoutRemovedElement);
  }

  const taskDone = async (id) => {
    const newTasks = tasks.map(task => ({
      ...task,
      isDone: task.id === id ? !task.isDone : task.isDone
    }));

    console.log("checked: ", newTasks);
    const newSelectedDate = { ...selectedDate, tasks: newTasks };
    updateDate(newSelectedDate);

  }

  const changeName = (id, name) => {
    // const newTasks = tasks.map(task => ({
    //   ...task,
    //   name: task.id === id ? name : task.name
    // }));
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

