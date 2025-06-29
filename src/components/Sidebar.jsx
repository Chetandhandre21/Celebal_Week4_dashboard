import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const activePath = location.pathname;

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin Dashboard</h2>
      <ul className="sidebar-links">
        <li className={activePath === '/' ? 'active' : ''}><Link to="/">Dashboard</Link></li>
        <li className={activePath === '/calendar' ? 'active' : ''}><Link to="/calendar">Calendar</Link></li>
        <li className={activePath === '/kanban' ? 'active' : ''}><Link to="/kanban">Kanban Board</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
