import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CalendarPage from './pages/CalendarPage';
import KanbanBoard from './pages/KanbanBoard';
import ThemeContextProvider from './contexts/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeContextProvider>
      <Router>
        <div className="app-container">
          <Sidebar />
          <div className="content-area">
            <Navbar />
            <div className="page-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/kanban" element={<KanbanBoard />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;
