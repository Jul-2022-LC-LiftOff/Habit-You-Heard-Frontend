import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinkButton from "../components/LinkButton";
import Stack from "@mui/material/Stack";
import Habit from "../components/Habit";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";


const StyledDiv = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
}));


export default function Home(props) {
  
  const [habits, setHabits] = useState([]);
    // const userHabits = {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json" }
    //   // body: JSON.stringify(getHabits),
    // };
    // fetch(`http://localhost:8080/api/habits/1`, userHabits)
    //   .then(response => response.json())
    //   .then(data => {setHabits(data)});

    useEffect(() => {
      fetch('http://localhost:8080/api/habits/1')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setHabits(data);
      })
    }, [props]);
    
  console.log(habits);

  const current = new Date();
  const date = `${current.getMonth() +
    1}/${current.getDate()}/${current.getFullYear()}`;

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
            Hello,
          </Typography>

          <Stack direction="row" spacing={2}>
            <ThemeToggle onToggleTheme={props.onToggleTheme} />
            <LinkButton to="yourprogress">Badges</LinkButton>
            <LinkButton to="/auth/signin">Logout</LinkButton>
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
            <Habit name={habit.name} description={habit.description}></Habit>
          </Grid>
       ))} 
      </Grid>
    </>
  );
}
