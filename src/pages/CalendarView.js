import React from 'react';
import HabitCalendar from '../components/HabitCalendar.js'
import Taskbar from '../components/Taskbar.js';
import BackButtonBar from '../components/BackButtonBar.js';

const CalendarView = ({user, habits, darkMode, onToggleTheme, setUser, setHabits}) => {
    return (<>{/*<Taskbar contentType="date" name={user.username}/>*/}
    <BackButtonBar 
      points={user.points}
      darkMode={darkMode} 
      onToggleTheme={onToggleTheme}
      setUser={setUser}
      setHabits={setHabits}/>
    <HabitCalendar habits={habits}/></>);
  };

  export default CalendarView;
