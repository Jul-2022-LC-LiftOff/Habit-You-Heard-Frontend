import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Taskbar from "../components/Taskbar";
import Users from "../testData/testUsers.json";
import Habits from "../testData/testHabits.json";
import { Paper } from '@mui/material';
import HabitBadgeProgress from '../components/HabitBadgeProgress';
import BackButtonBar from "../components/BackButtonBar";

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

//TODO: remove placeholder user in taskbar.
const YourProgress = ({habits, user, darkMode, onToggleTheme, setHabits, setUser}) => {
  console.log(user);
      return (
      <Paper sx={{backgroundImage: `url(backgroun.png)`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  minxWidth: "100vw",
                  minHeight: "100vh"}}>
        {/*<Taskbar contentType="points" name={user.username} points={user.points}></Taskbar>*/}
        <BackButtonBar 
          points={user.points}
          darkMode={darkMode} 
          onToggleTheme={onToggleTheme}
          setUser={setUser}
          setHabits={setHabits}/>
        <Grid container spacing={10} marginTop="70px" justifyContent="center">
            {habits.map((habit) => (
                <HabitBadgeProgress 
                  title={habit.name}
                  description={habit.description}
                  badgeMeta={getBadgeNameAndURL(habit.pointValue)}
                  streakLength={getStreakMessage(habit.streak)}
                  score={habit.pointValue}
                />
            ))}
        </Grid>
      </Paper>)};
  
  export default YourProgress;