import React, { useContext } from 'react';
import { FilterContext } from '../../../../contexts/FilterContext';
import { MenuItem, Select } from '@mui/material';
import { FILTER } from '../../../../constants/filters';
import styles from './TasksFilter.module.scss'
import { useTheme } from '../../../../contexts/ThemeContext';
import cx from 'classnames'

const TasksFilter = (props) => {
  const filter = useContext(FilterContext);
  const { theme } = useTheme();

  return (
    <div className={cx(styles[theme], styles.filter)}>
      <Select id={styles.filter} className={styles[theme]} name='filter' value={filter} onChange={({ target: { value } }) => props.filterChanged(value)}>
        <MenuItem value={FILTER.ALL}>All</MenuItem>
        <MenuItem value={FILTER.DONE}>Done</MenuItem>
        <MenuItem value={FILTER.NOTDONE}>Not done</MenuItem>
      </Select>
    </div>
  );
}

export default TasksFilter;
