import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Taskbar from "../components/Taskbar";
import Users from "../testData/testUsers.json";
import Habits from "../testData/testHabits.json";
import { Typography } from '@mui/material';
import Box from "@mui/material/Box";
import HabitBadgeProgress from '../components/HabitBadgeProgress';

const getBadgeImage = (score) => {
  const badgeNum = Math.floor(score / 50);
  return "/badgeicons/levelbadge" + badgeNum + ".png";
}

const getStreakMessage = (streak) => {
  return streak > 0 ? `${streak} day streak!`: "No streak yet."
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
    let listUsers = Users.users;
    let listHabits = Habits.habits;
      return (
      <>
      <Taskbar contentType="points" points={listUsers[0].points}></Taskbar>
      <Grid container spacing={1} marginTop="70px">
          {listHabits.map((habit) => (
            <Grid xs={12} md={6}>
              <HabitBadgeProgress 
                title={habit.name}
                description={habit.description}
                badgeImgUrl={getBadgeImage(habit.pointValue)}
                streakLength={getStreakMessage(habit.streak)}
              />
            </Grid>
          ))}
      </Grid>
      </>)};
  
  export default YourProgress;