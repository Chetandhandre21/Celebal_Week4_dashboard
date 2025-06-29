import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './CalendarPage.css';

const CalendarPage = () => (
  <div className="calendar-page">
    <h2 className="calendar-title">Calendar</h2>
    <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
  </div>
);

export default CalendarPage;
