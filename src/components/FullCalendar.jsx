import React from 'react'
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

export default class FullCalendarApp extends React.Component {
  render() {
    return (
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        eventContent={renderEventContent}
        events={[
                        { title: 'Reading book', allDay: true, start: '2022-08-29', end: '2022-08-30', daysOfWeek:[0,1,2,4,6] },
                        { title: 'Jogging', allDay: true, start: '2022-08-20', daysOfWeek: [1,2,3,4], color: 'red' },
                        {title: 'playing Stardew Valley', allDay: true, start: '2022-08-29', daysOfWeek:[0,6]}
      ]}/>
    )
  }
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}