import React, { useContext } from 'react';
// import { FILTER } from '../../../../constants/filter';
// import { FilterContext } from '../../context';
import { IconButton, Input } from '@mui/material';
import { Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './TaskList.module.scss'

const TaskList = (props) => {
  const { tasks } = props;
  // const filter = useContext(FilterContext);

  // let tasksList = [];
  // if (filter != FILTER.ALL) {
  //   const isDone = filter == FILTER.DONE;
  //   tasksList = tasks.filter(task => task.done == isDone);
  // } else {
  //   tasksList = [...tasks];
  // }

  return (
    <div className={styles["task-list"]}>
      {
        tasks.map((task, index) => <label key={index}>
          <Input sx={{ color: 'white' }} className={styles.input} type='text' value={task.task} onChange={({ target: { value } }) => props.changeName(task.id, value)} />
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
