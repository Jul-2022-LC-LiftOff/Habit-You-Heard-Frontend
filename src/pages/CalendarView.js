import React from 'react';
import HabitCalendar from '../components/HabitCalendar.js'
import Taskbar from '../components/Taskbar.js';

const CalendarView = ({user, habits}) => {
    return (
      <>
        <BackButtonBar 
          points={user.points}
          darkMode={darkMode} 
          onToggleTheme={onToggleTheme}
          setUser={setUser}
          setHabits={setHabits}/>        
        <HabitCalendar habits={habits}/>
      </>
    );
  };

  export default CalendarView;
