import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
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
import testUser from "./testData/testUser.json";

function App() {
  const [user, setUser] = useState(testUser);
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
  }, []);

  const fetchHabits = () => {
    fetch("http://localhost:8080/api/habits/", {
      headers: {
        Authorization:
          "$2a$10$V44dbrDO3HSoNvP61pCZoO03ihL7mZSZ4srW2mGP0HoF01KTjH1wi",
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
                <Home
                  onToggleTheme={handleToggleTheme}
                  user={user}
                  habits={habits}
                />
              }
            />

            <Route path="yourprogress" element={<YourProgress />} />
            <Route path="calendar" element={<CalendarView />} />
            <Route
              path="habitsPage"
              element={
                <HabitsPage
                  user={testUser}
                  habits={habits}
                  setHabits={setHabits}
                />
              }
            />
            <Route path="OpportunitiesPage" element={<OpportunitiesPage />} />
          </Route>
          <Route path="/auth" element={<AuthBackground />}>
            <Route path="signin" element={<SignIn setUser={setUser} />} />
            <Route path="signup" title={SignUp.title} element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
