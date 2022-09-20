import { ArrowBack } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Fab from "@mui/material/Fab";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddHabit from "../components/AddHabit";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function HabitsPage({ habits, setHabits, user }) {
  const [daysOfTheWeek, setDaysOfTheWeek] = useState([]);

  const [createHabit, setCreateHabit] = useState({
    name: "",
    selectedDays: "",
    description: "",
  });

  const handleStopHabit = (habitId) => {
    fetch(`http://localhost:8080/api/habit/${habitId}/stop`, {
      method: "POST",
      headers: {
        Authorization: user.token,
      },
    })
      .then((res) => res.text())
      .then(() => {
        const newHabitArray = habits.filter((habit) => habit.id != habitId);
        setHabits([...newHabitArray]);
      });
  };

  const handleCreateHabitFetch = () => {
    fetch("http://localhost:8080/api/habit/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
      body: JSON.stringify(createHabit),
    })
      .then((res) => res.json())
      .then((data) => {
        setHabits([...habits, data]);
      });
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDaysOfTheWeek(typeof value === "string" ? value.split(",") : value);
    setCreateHabit({
      ...createHabit,
      selectedDays: value,
    });
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "primary.main",
          display: "flex",
          width: 130,
          height: 130,
          borderEndEndRadius: 130,
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to="/" sx={{ textDecoration: "none" }}>
          <Box
            sx={{
              backgroundColor: "#fafafa",
              display: "flex",
              width: 60,
              height: 60,
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ArrowBack />
          </Box>
        </Link>
      </Box>

      <Grid container position="relative">
        <Grid xs={12} display="flex" justifyContent="center">
          <Box
            sx={{
              backgroundColor: "primary.main",
              width: 400,
              height: 100,
              borderRadius: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: 50,
                color: "#fafafa",
              }}
            >
              Daily Habits
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} marginTop="20px">
        {habits.map((habit) => (
          <Grid xs={6} display="flex" justifyContent="center">
            <AddHabit
              name={habit.name}
              habit={habit}
              buttonHandler={handleStopHabit}
            ></AddHabit>
          </Grid>
        ))}
      </Grid>

      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          top: 20,
        }}
        direction="row"
      >
        <TextField
          sx={{ m: 1, width: 200, marginBottom: "25px" }}
          id="outlined-basic"
          label="Enter new habit name"
          variant="outlined"
          value={createHabit.name}
          onChange={(e) => {
            setCreateHabit({
              ...createHabit,
              name: e.target.value,
            });
          }}
        />

        <TextField
          sx={{ m: 1, width: 250, marginBottom: "25px" }}
          id="outlined-multiline-flexible"
          label="Enter habit description"
          multiline
          maxRows={4}
          value={createHabit.description}
          onChange={(e) => {
            setCreateHabit({
              ...createHabit,
              description: e.target.value,
            });
          }}
        />

        <div>
          <FormControl sx={{ m: 1, width: 150, marginBottom: "25px" }}>
            <InputLabel id="multiple-checkbox-label">Day(s)</InputLabel>
            <Select
              labelId="multiple-checkbox-label"
              id="multiple-checkbox"
              multiple
              value={daysOfTheWeek}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {days.map((day) => (
                <MenuItem key={day} value={day}>
                  <Checkbox checked={daysOfTheWeek.indexOf(day) > -1} />
                  <ListItemText primary={day} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <Fab color="primary" onClick={handleCreateHabitFetch}>
          <AddIcon />
        </Fab>
      </Stack>
    </>
  );
}
