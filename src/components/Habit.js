import React, { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/system";
import { pink } from "@mui/material/colors";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

const StyledButton = styled(Button)({
  height: 100,
});

function Habit({ checkmarkHandler, checkDefirmHandler, habits, setHabits, habit, user }) {

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleAffirmHabit = (habitId, type) => {
    console.log("Will this hit.", habitId);
    fetch(`http://localhost:8080/api/habit/${habitId}/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
    })
      .then((res) => res.json())
      .then((updatedHabit) => {
        const updatedHabitsList = habits.filter((habit) => habit.id !== habitId);
        setHabits([...updatedHabitsList, updatedHabit])
      });
  };

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

  const isHabitAffirmed = (habitMetaArray) => {
    console.log("habitMetaArray", habitMetaArray);
    const current = new Date();
    const currentDate = `${current.getFullYear()}-${current.getMonth()}-${current.getDate()}`;
    console.log("current date", currentDate);

    const todaysHabit =  habitMetaArray.map((habitMeta) => {
      const habitMetaDate = new Date(habitMeta.dateOfCompletion);
      const convertedDate = `${habitMetaDate.getFullYear()}-${habitMetaDate.getMonth()}-${habitMetaDate.getDate()}`;
      console.log("date converted", convertedDate);
      if(convertedDate === currentDate){
        return habitMeta;
      }
    })
    return todaysHabit.completedHabit;
  }

  return (
    <ButtonGroup variant="contained">
      <StyledButton size="small">
        <Checkbox
          onChange={(event) => {
            if(event.target.checked){
              handleAffirmHabit(habit.id, "affirm");
            } else {
              handleAffirmHabit(habit.id, "defirm")
            }
          }}
          size="large"
          sx={{
            color: pink[800],
            "&.Mui-checked": {
              color: pink[600],
            },
          }}
        />
      </StyledButton>
      <StyledButton sx={{ width: 250 }} onClick={handleClick}>
        {habit.name}
      </StyledButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>{habit.description}</Typography>
      </Popover>
    </ButtonGroup>
  );
}

export default Habit;
