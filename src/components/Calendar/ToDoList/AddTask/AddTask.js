import Add from '@mui/icons-material/Add';
import { Button, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React, { useState } from 'react';
import './AddTask.scss'

const AddTask = (props) => {
  const [task, setTask] = useState('');

  const addTask = () => {
    if (task === '')
      return;
    props.addTask(task);
    setTask('');
  }

  const handleEnter = ({ keyCode }) => {
    if (keyCode === 13) {
      addTask();
    }
  }


  return (
    <div>
      <OutlinedInput
        id='new-task-input'
        name='task'
        placeholder='New task'
        value={task}
        onChange={({ target: { value } }) => setTask(value)}
        onKeyUp={handleEnter}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={addTask}>
              <Add className='add' />
            </IconButton>
          </InputAdornment>} />
    </div>
  );
}

export default AddTask;
