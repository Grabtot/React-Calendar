import { Avatar } from '@mui/material';
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeSwitch from './ThemeSwitch/ThemeSwitch';
import styles from './Toolbar.module.scss'
import cx from 'classnames'
import { THEME } from '../../constants/themes';

const Toolbar = () => {
  const { theme, toggleTheme } = useTheme();
  const toolbarStyle = cx(styles.toolbar, styles[theme]);

  return (
    <header className={toolbarStyle}>
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li>
            <ThemeSwitch theme={theme} onChange={toggleTheme} checked={theme != THEME.LIGHT} />
          </li>
          <li>
            <span className={styles.avatar}>
              <p>Account </p>
              <Avatar />
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Toolbar;
