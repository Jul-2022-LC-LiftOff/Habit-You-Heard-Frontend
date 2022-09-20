import React from 'react';
import HabitCalendar from '../components/HabitCalendar.js'
import Taskbar from '../components/Taskbar.js';
const CalendarView = () => {
    return (<><Taskbar contentType="date" ></Taskbar><HabitCalendar/></>);
  };

  export default CalendarView;
