import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Taskbar from "../components/Taskbar";
import Users from "../testData/testUsers.json";
import Habits from "../testData/testHabits.json";
import { Typography, Paper } from '@mui/material';
import Box from "@mui/material/Box";
import HabitBadgeProgress from '../components/HabitBadgeProgress';

const divisions = ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Emerald", "Diamond"];
const divisionColors = ["#a19d94", "#cd7f32", "#c0c0c0", "#ffd700", "#e5e4e2", "#50c878", "#b9f2ff" ];
const divisionOffColors = ["#fafafa", "#fafafa", "black", "black", "black", "#fafafa", "black"];

const getBadgeNameAndURL = (score) => {
  let badgeNum = Math.floor(score / 50);
  if(isNaN(badgeNum)){badgeNum = -1;}
  let rankIndex = Math.floor(badgeNum / 21);
  let rank = divisions[rankIndex];
  let color = divisionColors[rankIndex];
  let offColor = divisionOffColors[rankIndex];
  let rankNum = (badgeNum % 21);
  
  if(rankNum===20){
    rank += " III";
  } else if(rankNum>9){
    rank += ` II. ${rankNum%10}/10`;
  } else {
    rank += ` I. ${rankNum}/9`;
  }
  let imgUrl = "/badgeicons/levelbadge" + (badgeNum <= 140 ? badgeNum : 140) + ".png";
  
  return {"imgUrl" : imgUrl, 
          "rank" : rank,
          "color": color,
          "offColor": offColor};
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
      <Paper sx={{backgroundImage: `url(background2.png)`}}>
      <Taskbar contentType="points" points={listUsers[0].points}></Taskbar>
      <Grid container spacing={10} marginTop="70px" justifyContent="center">
          {listHabits.map((habit) => (
            <Grid xs={10} md={3.5}>
              <HabitBadgeProgress 
                title={habit.name}
                description={habit.description}
                badgeMeta={getBadgeNameAndURL(habit.pointValue)}
                streakLength={getStreakMessage(habit.streak)}
                score={habit.pointvalue}
              />
            </Grid>
          ))}
      </Grid>
      </Paper>)};
  
  export default YourProgress;