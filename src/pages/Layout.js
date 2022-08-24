import React from 'react';
import { Outlet, Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {
  Button,
  createTheme,
  Paper,
  ThemeProvider,
  Typography
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline"
import { useState } from 'react'

const Layout = () => {
  const [darkMode, setDarkMode] = useState(false)
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : 'light'
    }
  })
  return (
  <ThemeProvider theme={theme}>
    <CssBaseline>
      <Outlet />
      <button id='dark-mode' onClick={() => {setDarkMode(!darkMode)}}>Toggle dark/light Mode</button>
    </CssBaseline>
  </ThemeProvider>

)
};

export default Layout;