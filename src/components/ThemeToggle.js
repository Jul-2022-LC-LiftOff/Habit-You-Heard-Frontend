import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { styled } from "@mui/material/styles";


const StyledIcon = styled(IconButton)(({theme}) => ({
    color: theme.palette.text.secondary
  }));

const ThemeToggle = (props) => {
    
    return (
        <StyledIcon id='dark-mode' onClick={() => props.onToggleTheme()}>
            {props.darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </StyledIcon>
  )
  };
  
  export default ThemeToggle;