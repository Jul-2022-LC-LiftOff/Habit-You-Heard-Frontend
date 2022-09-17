import React from 'react'
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import testHabits from "../testData/testHabits.json";

const {habits} = testHabits;

let daysCheckArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function DataConversion(habits){
  let habitsArray= [];
  for(let i = 0; i< habits.length; i++){
    habitsArray[i] = {};
    habitsArray[i].startRecur = habits[i].start
    habitsArray[i].title = habits[i].name
    habitsArray[i].daysOfWeek = habits[i].selectedDays.map(day => 
      {
        return daysCheckArray.indexOf(day);
      }
    );
    
  }
  return habitsArray;
}

function HabitCalendar() {
 let habitsArray = DataConversion(habits)
    return (
      <FullCalendar
      selectable= {true}
        plugins={[ dayGridPlugin ]}
        eventContent={renderEventContent}
        events = {(habitsArray)}/>
        
        

        
    )
  }


function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

export default HabitCalendar;

