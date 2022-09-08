import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthBackground from "./components/layouts/AuthBackground";
import SignUp from "./pages//signup/SignUp";
import CalendarView from "./pages/CalendarView";
import HabitsPage from "./pages/HabitsPage";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import OpportunitiesPage from "./pages/OpportunitiesPage";
import SignIn from "./pages/SignIn";
import YourProgress from "./pages/YourProgress";



function App() {
  
  const [darkMode, setDarkMode] = useState(false)
  const handleToggleTheme = () => {setDarkMode(!darkMode)}
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light"
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Home darkMode={darkMode} onToggleTheme={handleToggleTheme} />} />

            <Route path="yourprogress" element={<YourProgress />} />
            <Route path="calendar" element={<CalendarView />} />
            <Route path="habitsPage" element={<HabitsPage />} />
            <Route path="OpportunitiesPage" element={<OpportunitiesPage />} />
          </Route>
          <Route path="/auth" element={<AuthBackground />}>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" title={SignUp.title} element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
