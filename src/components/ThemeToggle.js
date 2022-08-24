import React, { useState } from "react";



const ThemeToggle = (props) => {
    return (
        <button id='dark-mode' onClick={() => props.onToggleTheme()}>Toggle dark/light Mode</button>
  )
  };
  
  export default ThemeToggle;