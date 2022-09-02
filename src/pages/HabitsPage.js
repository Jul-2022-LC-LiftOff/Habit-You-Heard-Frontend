import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import InputUnstyled from "@mui/base/InputUnstyled";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AddHabit from "../components/AddHabit";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";
// import { userForm } from "react-hook-form";

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  600: "#0072E5",
};

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const StyledInputElement = styled("input")(
  ({ theme }) => `
    width: 320px;
    font-size: 1.2rem;
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 400;
    line-height: 2.5;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
    border-radius: 8px;
    padding: 12px 12px;
  
    &:hover {
      background: ${theme.palette.mode === "dark" ? "" : grey[100]};
      border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
    }
  
    &:focus {
      outline: 3px solid ${
        theme.palette.mode === "dark" ? blue[600] : blue[100]
      };
    }
  `
);

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

// type formValues = {
//   name: string;
//   description: string;
// };

export default function HabitsPage(props) {
  // Remove the fetch request, use the test habits and try to fix the form.
  const [habits, setHabits] = useState([]);
  useEffect(() => {
    const userHabits = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify(getHabits),
    };
    fetch(
      `http://localhost:8080/api/habits/1`,
      userHabits
    ).then((response) => response.json());
    // .then(data => setHabits(data.id));
  });

  const CustomInput = React.forwardRef(function CustomInput(props, ref) {
    return (
      <InputUnstyled
        components={{ Input: StyledInputElement }}
        {...props}
        ref={ref}
      />
    );
  });

  const [daysOfTheWeek, setdaysOfTheWeek] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setdaysOfTheWeek(typeof value === "string" ? value.split(",") : value);
  };

  // const { register, handleSubmit } = useForm<FormValues>({
  //   defaultValues: {
  //     name: '',
  //     description: ''
  //   }
  // });

  const onSubmit = (e) => {
    e.preventDefault();
  }

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

      <Grid container position="relative" top="80">
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
              description={habit.description}
            ></AddHabit>
          </Grid>
        ))}
      </Grid>

      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          top: 20,
        }}
        direction="row"
      >
        <CustomInput placeholder="Enter new habit here..."/>
        {/* {...register("name")} */}

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

        <input type="submit">
        <Fab color="primary">
          <AddIcon />
        </Fab>
        </input>

      </Stack>
      {/* </form> */}
    </>
  );
}
