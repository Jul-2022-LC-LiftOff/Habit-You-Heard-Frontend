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
  console.log(user);

  const [disaffirmHabit, setDisaffirmHabit] = useState({
    completeHabit: null,
  });

  // habit id undefinted
  // const handleAffirmHabit = () => {
  //   fetch(`http://localhost:8080/api/habit/${habits.id}/defirm`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization:
  //         "$2a$10$0PnMZCHd.pFny4y2zTQE9e9BM8aBSuROyIt69uHzsPz16Lm8nhcYa",
  //     },
  //     body: JSON.stringify(disaffirmHabit),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log("res", res);
  //       setDisaffirmHabit({
  //         ...disaffirmHabit,
  //         completeHabit: false,
  //       });
  //     });
  // };

  const current = new Date();
  const date = `${
    current.getMonth() + 1
  }/${current.getDate()}/${current.getFullYear()}`;


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
        <Grid xs={6} display="flex" justifyContent="center">
          <LinkButton to="opportunitiesPage" sx={{ width: 155, height: 45 }}>
            Opportunities
          </LinkButton>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {habits.map((habit) => (
          <Grid xs={6} display="flex" justifyContent="center">
            <Habit
              name={habit.name}
              description={habit.description}
              // checkHandler={handleAffirmHabit}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
