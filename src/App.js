import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material'
import Button from '@mui/material/Button';
import SignInSide from './components/SignInSide';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'src/Calendar.css';

const theme = createTheme({
  palette: {
    mode: "dark"
  }
})

function App() {
const [date, setDate] = useState(new Date());
//beginning of calender segment
 <div className='app'>
      <h1 className='text-center'>React Calendar</h1>
      <div className='calendar-container'>
        <Calendar onChange={setDate} value={date} />
      </div>
      <p className='text-center'>
        <span className='bold'>Selected Date:</span>{' '}
        {date.toDateString()}
      </p>
    </div>
    //end of calender segment
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SignInSide />
    </ThemeProvider>
  );
}

export default App;
