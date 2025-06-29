import React, { useContext } from 'react';
import './Navbar.css';
import { ThemeContext } from '../contexts/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="navbar">
      <h1 className="navbar-title">Dashboard</h1>
      <button className="theme-toggle" onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
};

export default Navbar;
