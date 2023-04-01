import Add from '@mui/icons-material/Add';
import { Button, IconButton, Input } from '@mui/material';
import React, { useState } from 'react';

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
      <label>
        <Input name='task' sx={{ color: 'white' }} type='text' value={task} onChange={({ target: { value } }) => setTask(value)}
          placeholder='Enter task' onKeyUp={handleEnter} />
        <IconButton sx={{ color: '#0099cc' }} onClick={addTask}>
          <Add />
        </IconButton>
      </label>
    </div>
  );
}

export default AddTask;
