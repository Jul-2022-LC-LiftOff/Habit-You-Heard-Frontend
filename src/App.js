import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material'
import Button from '@mui/material/Button';
import SignInSide from './components/SignInSide';
import { useState } from 'react';
import Calendar from 'react-calendar';
import Time from './Time.js';

const theme = createTheme({
  palette: {
    mode: "dark"
  }
})

function App() {
return (

   <ThemeProvider theme={theme}>
      <CssBaseline />
      <SignInSide />
    </ThemeProvider>
  );
}

export default App;
