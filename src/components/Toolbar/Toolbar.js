import { Avatar } from '@mui/material';
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeSwitch from './ThemeSwitch/ThemeSwitch';
import styles from './Toolbar.module.scss'

const Toolbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.toolbar}>
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li>
            <ThemeSwitch theme={theme} onChange={toggleTheme} />
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
