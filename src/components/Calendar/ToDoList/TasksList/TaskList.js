import React, { useContext } from 'react';
import { IconButton, Input } from '@mui/material';
import { Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './TaskList.module.scss'
import { FILTER } from '../../../../constants/filters';
import { FilterContext } from '../../../../contexts/FilterContext';

const TaskList = (props) => {
  const { tasks } = props;
  const filter = useContext(FilterContext);

  let filteredList = [];
  if (filter != FILTER.ALL) {
    const isDone = filter == FILTER.DONE;
    filteredList = tasks.filter(task => task.isDone == isDone);
  } else {
    filteredList = [...tasks];
  }

  return (
    <div className={styles["task-list"]}>
      {
        filteredList.map((task, index) => <label key={index}>
          <Input sx={{ color: 'white' }} className={styles.input} type='text' name='task' value={task.task} onChange={({ target: { value } }) => props.changeName(task.id, value)} />
          <Checkbox sx={{ color: '#0099cc' }} type='checkbox' onChange={() => props.taskDone(task.id)} checked={task.isDone} />
          <IconButton color='error' onClick={() => props.removeTask(task.id)}>
            <DeleteIcon />
          </IconButton>
        </label>)
      }
    </div>
  );
}

export default TaskList;
