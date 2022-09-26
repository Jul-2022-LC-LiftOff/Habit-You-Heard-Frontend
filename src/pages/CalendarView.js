import React from 'react';
import HabitCalendar from '../components/HabitCalendar.js'
import Taskbar from '../components/Taskbar.js';
const CalendarView = ({user, habits}) => {
    return (
      <>
        <Taskbar contentType="date" name={user.username}/>
        <HabitCalendar habits={habits}/>
      </>
    );
  };

  export default CalendarView;
