import React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LinkButton from "../components/LinkButton";
import testUser from "../testData/testUser.json";
import Stack from "@mui/material/Stack";
import testHabits from "../testData/testHabits.json";
import Habit from "../components/Habit";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  "@media all": {
    minHeight: 128,
  },
}));

export default function ProminentAppBar() {
  const current = new Date();
  const date = `${current.getMonth() +
    1}/${current.getDate()}/${current.getFullYear()}`;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <StyledToolbar>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ flexGrow: 1, alignSelf: "flex-start" }}
          >
            Hello, {testUser.username}
          </Typography>

          <Box
            sx={{
              width: 150,
              height: 150,
              borderRadius: 100,
              backgroundColor: "secondary.dark",
              alignSelf: "flex-end",
              marginX: 50,
            }}
          >
            <Typography
              sx={{
                fontSize: 25,
                marginY: 7.5,
                textAlign: "center",
              }}
            >
              {date}
            </Typography>
          </Box>

          <Stack direction="row" spacing={2}>
            <LinkButton to="calendar">Groups</LinkButton>
            <LinkButton to="yourprogress">Badges</LinkButton>
            <LinkButton to="signin">Logout</LinkButton>
          </Stack>
        </StyledToolbar>
      </AppBar>

      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-around"
        alignItems="center"
        flexWrap="wrap"
        marginY={5}
      >
        {testHabits.habits.map((habit) => (
          <Habit name={habit.name} description={habit.description}>
          </Habit>
        ))}
      </Stack>
    </Box>
  );
}

{
  /* <LinkButton
to="yourprogress"
variant="outlined"
onClick={() => console.log("hello")}
style={{ fontSize: "20px" }}
>
Link Button
</LinkButton> */
}

// {
//   testHabits.habits.map((habit) => <Habit name={habit.name} />);
// }

{
  /* <Box
sx={{
  width: 100,
  height: 100,
  borderRadius: 100,
  alignItems: 'baseline',
  backgroundColor: 'secondary.dark'
}}
/> */
}
