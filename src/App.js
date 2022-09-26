import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthBackground from "./components/layouts/AuthBackground";
import SignUp from "./pages//signup/SignUp";
import CalendarView from "./pages/CalendarView";
import HabitsPage from "./pages/HabitsPage";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import SignIn from "./pages/SignIn";
import YourProgress from "./pages/YourProgress";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {token: ""});
  const [habits, setHabits] = useState([]);

  const [darkMode, setDarkMode] = useState(false);
  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
  };
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const fetchHabits = () => {
    fetch("http://localhost:8080/api/habits/", {
      headers: {
        Authorization: user.token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setHabits(data.sort((a, b) => a.id - b.id));
      });
  };

  useEffect(() => {
    fetchHabits();
    localStorage.setItem("user", JSON.stringify(user));
  }, [user, fetchHabits]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                  user.token !== "" ? (
                    <Home
                    onToggleTheme={handleToggleTheme}
                    user={user}
                    setUser={setUser}
                    habits={habits}
                    setHabits={setHabits}
                    darkMode={darkMode}
                  
                  />                  ) : (
                    <Navigate replace to={"/auth/signin"} />
                  )
                }
              
            />

            <Route path="yourprogress" element={<YourProgress user={user} habits={habits}/>} />
            <Route path="calendar" element={<CalendarView user={user} habits={habits} />} />
            <Route
              path="habitsPage"
              element={
                <HabitsPage user={user} habits={habits} setHabits={setHabits} />
              }
            />
          </Route>
          <Route path="/auth" element={<AuthBackground />}>
            <Route path="signin" element={<SignIn setUser={setUser} user={user} habits={habits} />} />
            <Route path="signup" title={SignUp.title} element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
