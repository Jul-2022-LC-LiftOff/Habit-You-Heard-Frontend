import React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinkButton from "../components/LinkButton";
import testUser from "../testData/testUser.json";
import Stack from "@mui/material/Stack";
import testHabits from "../testData/testHabits.json";
import Habit from "../components/Habit";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";


const StyledDiv = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
}));

export default function Home(props) {
  
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
            Hello, {testUser.username}
          </Typography>

          <Stack direction="row" spacing={2}>
          <ThemeToggle darkMode={props.darkMode} onToggleTheme={props.onToggleTheme} />
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
        {testHabits.habits.map((habit) => (
          <Grid xs={6} display="flex" justifyContent="center">
            <Habit name={habit.name} description={habit.description}></Habit>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
