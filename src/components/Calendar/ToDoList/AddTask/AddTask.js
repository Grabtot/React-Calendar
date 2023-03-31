import Add from '@mui/icons-material/Add';
import { Button, IconButton, Input } from '@mui/material';
import React, { useState } from 'react';

const AddTask = (props) => {
  const [task, setTask] = useState('');
  return (
    <div>
      <label>
        <Input sx={{ color: 'white' }} type='text' name='name' value={task} onChange={({ target: { value } }) => setTask(value)}
          placeholder='Enter task' />
        <IconButton sx={{ color: '#0099cc' }} onClick={() => props.addTask(task)}>
          <Add />
        </IconButton>
      </label>
    </div>
  );
}

export default AddTask;
