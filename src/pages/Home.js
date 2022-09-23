import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
// import testHabits from "../testData/testHabits.json";
import Habit from "../components/Habit";
import LinkButton from "../components/LinkButton";
import SignoutButton from "../components/SignoutButton";
import ThemeToggle from "../components/ThemeToggle";


// import testUser from "../testData/testUser.json";

const StyledDiv = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
}));


export default function Home({ habits, setHabits, onToggleTheme, user, setUser, darkMode}) {

  const current = new Date();
  const date = `${
    current.getMonth() + 1
  }/${current.getDate()}/${current.getFullYear()}`;

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const todaysHabits = habits.filter((habit) => habit.selectedDays.includes(days[current.getDay()]));

  // const handleDefirmHabit = (habitId) => {
  //   fetch(`http://localhost:8080/api/habit/21/defirm`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: user.token,
  //     },
  //     body: JSON.stringify(habitAffirmation),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log("res", res);
  //       setHabitAffirmation({
  //         ...habitAffirmation,
  //         completeHabit: false,
  //       });
  //     });
  // };

  function handleSignout(){
    setUser({token: ""})
    setHabits([])
    navigate("/auth/signin")
    
  }
  const navigate = useNavigate();



  return (
    <>
      <AppBar sx={{ marginBottom: "15px" }} position="static">
        <Stack direction="row" paddingBottom={4} minHeight="43px">
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ flexGrow: 1, alignSelf: "flex-start" }}
          >
            Hello, {user.username}
          </Typography>

          <Stack direction="row" spacing={2}>
            <ThemeToggle darkMode={darkMode} onToggleTheme={onToggleTheme} />
            <LinkButton to="yourprogress">Badges</LinkButton>
            <SignoutButton to="/auth/signin" onClick={() => handleSignout()}>Logout</SignoutButton>
          </Stack>
        </Stack>

        <Link to="calendar" textDecoration="none">
          <StyledDiv>
            <Box
              sx={{
                width: 150,
                height: 150,
                borderRadius: 100,
                backgroundColor: "secondary.dark",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: 0,
              }}
            >
              <Typography
                sx={{
                  color: "#fafafa",
                  fontSize: 25,
                }}
              >
                {date}
              </Typography>
            </Box>
          </StyledDiv>
        </Link>
      </AppBar>

      <Grid container sx={{ marginBottom: "50px" }}>
        <Grid xs={6} display="flex" justifyContent="center">
          <LinkButton to="habitsPage" sx={{ width: 155, height: 45 }}>
            Daily Habits
          </LinkButton>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {todaysHabits.map((habit) => (
          <Grid xs={6} display="flex" justifyContent="center">
            <Habit
              habit={habit}
              setHabits={setHabits}
              habits={habits}
              user={user}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
