import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

let daysCheckArray = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function DataConversion(habits) {
  let eventsArray = [];
  habits.map((habit) => {

    let nextDay;

    habit.habitMetaList.map((habitMeta) => {

      const habitMetaDate = new Date(habitMeta.dateOfCompletion);
      nextDay = `${habitMetaDate.getFullYear()}-${(habitMetaDate.getMonth() + 1).toString().padStart(2, "0")}-${habitMetaDate.getDate() + 1}`;

      eventsArray.push({
        title: habit.name,
        start: habitMeta.dateOfCompletion,
        allDay: true,
        backgroundColor: habitMeta.completedHabit ? "#1BD835" : "#d81b60"
      })
    })

    eventsArray.push({
      startRecur: nextDay ? nextDay : habit.startDate,
      title: habit.name,
      daysOfWeek: habit.selectedDays.map((day) => {
        return daysCheckArray.indexOf(day);
      })
    })
  })
  return eventsArray;
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function HabitCalendar({ habits }) {
  let eventsArray = habits && DataConversion(habits);
  return (
    <FullCalendar
      selectable={true}
      plugins={[dayGridPlugin]}
      eventContent={renderEventContent}
      events={eventsArray}
    />
  );
}

export default HabitCalendar;
