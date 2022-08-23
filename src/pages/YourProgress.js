import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Badge from '../testData/testBadge.json';
import {styled} from "@mui/material/styles";
import Taskbar from "../components/Taskbar";
import Users from "../testData/testUsers.json";
import Habits from "../testData/testHabits.json";
import { Typography } from '@mui/material';
import Box from "@mui/material/Box";

const getBadgeImage = (user) => {
  const badgeNum = Math.floor(user.points / 50);
  return "./badgeicons/levelbadge" + badgeNum + ".png";
}

const getSelectedDays = (selectedDays) => {
  let daysLen = selectedDays.length;
  return selectedDays.map((day, i) => i < daysLen-1 ? `${day}, `: `${day}`);
}

const getStreakMessage = (streak) => {
  return streak > 0 ? `${streak} day streak!`: "No streak."
}

const ListBox = () => {return(
  <>
    <Box sx={{
      backgroundColor: "primary.main",
      width: 400,
      height: 100,
      borderRadius: 5,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}><Typography sx={{fontSize: 50, color: "#fafafa"}}></Typography></Box>
  </>
)};
//TODO: remove placeholder user in taskbar.
const YourProgress = () => {
    let listBadge = Badge.badges;
    let listUsers = Users.users;
    let listHabits = Habits.habits;
      return (
      <>
      <Taskbar contentType="points" points={listUsers[0].points}></Taskbar>
      <Grid container spacing={2} marginTop="90px">
          {listHabits.map((habit) => (
            <Grid xs={5.6} display="flex" justifyContent="flex-start" direction="row" marginX="1.66%">
              <Box sx={{
                backgroundColor: "primary.main",
                width: "100%",
                height: "100%",
                borderRadius: 5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <Grid xs={12} sx={{ height: "20%" }}>{habit.name}</Grid>
                <Grid xs={12} sx={{ height: "80%" }} direction="row">
                  <Grid sx={{ width: "33%", minHeight: 100, borderRight: 1, alignItems: "stretch"}}>{habit.name}</Grid>
                  <Grid sx={{ width: "33%", minHeight: 100, borderRight: 1, alignItems: "stretch"}}>{habit.description}</Grid>
                  <Grid sx={{ width: "33%", alignItems: "stretch"}}>{getStreakMessage(habit.streak)}</Grid>
                </Grid>
              </Box>
            </Grid>
          ))}
        {/*<Grid item xs={6} spacing={2} marginTop="70px" direction={"column"} alignItems={"flex-end"}>
          {listUsers.map((user) => (
            <Grid xs={12} display="flex" justifyContent="center">
              <Grid sx={{ width: 250, height: 100}}>{user.name}</Grid>
              <Grid sx={{ width: 220, height:  100}}>{user.email}</Grid>
              <img src={getBadgeImage(user)} alt="Why don't I work :(" width="200" height="200" justifyContent="flex-start"></img>
              <Grid sx={{ width: 100, height: 100}}>{user.points} points</Grid>
            </Grid>
          ))}
          </Grid>*/}
      </Grid>
      </>)};
  
  export default YourProgress;