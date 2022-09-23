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
import OpportunitiesPage from "./pages/OpportunitiesPage";
import SignIn from "./pages/SignIn";
import YourProgress from "./pages/YourProgress";

function App() {
  const [user, setUser] = useState({token: ""});
  const [habits, setHabits] = useState([]);
  // console.log("This is the tested user: ", testUser);

  const [darkMode, setDarkMode] = useState(false);
  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
  };
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  useEffect(() => {
    fetchHabits();
  }, [user]);

  console.log(user, habits)

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
        setHabits(data);
      });
  };

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
