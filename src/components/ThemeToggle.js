import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';




const ThemeToggle = (props) => {
    console.log(props)
    return (
        <IconButton id='dark-mode' onClick={() => props.onToggleTheme()}>
            {props.darkMode ? "Dark Mode" :  "Light Mode"}
            {props.darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
  )
  };
  
  export default ThemeToggle;

//   {props.darkMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}