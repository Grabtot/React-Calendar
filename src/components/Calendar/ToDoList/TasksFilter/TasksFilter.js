import React, { useContext } from 'react';
import { FilterContext } from '../../../../contexts/FilterContext';
import { MenuItem, Select } from '@mui/material';
import { FILTER } from '../../../../constants/filters';

const TasksFilter = (props) => {
  const filter = useContext(FilterContext);
  return (
    <Select name='filter' value={filter} onChange={({ target: { value } }) => props.filterChanged(value)}>
      <MenuItem value={FILTER.ALL}>All</MenuItem>
      <MenuItem value={FILTER.DONE}>Done</MenuItem>
      <MenuItem value={FILTER.NOTDONE}>Not done</MenuItem>
    </Select>
  );
}

export default TasksFilter;
