import React from 'react';
import HabitCalendar from '../components/HabitCalendar.js'
import Taskbar from '../components/Taskbar.js';
import BackButtonBar from '../components/BackButtonBar.js';

const CalendarView = ({user, habits}) => {
    return (<>{/*<Taskbar contentType="date" name={user.username}/>*/}<BackButtonBar points={user.points}></BackButtonBar><HabitCalendar habits={habits}/></>);
  };

  export default CalendarView;
