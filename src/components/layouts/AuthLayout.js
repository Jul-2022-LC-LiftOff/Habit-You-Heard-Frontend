import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

const CircleButton = styled(Button)({
  borderRadius: 100,
  width: 100,
  height: 100,
});

const StyledDiv = styled("div")({
  marginLeft: 32,
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
});

function AuthLayout(props) {
  return (
    <StyledDiv>
      <Paper elevation={3} sx={{ padding: 8 }}>
        <Typography variant="h1">{props.title}</Typography>

        <Grid container sx={{ width: "100%" }}>
          <Grid xs={9}> {props.children}</Grid>
          <Grid
            xs={3}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <CircleButton variant="contained" onClick={props.buttonHandler}>
              <ArrowForwardIcon fontSize="large" sx={{ fontSize: 48 }} />
            </CircleButton>
          </Grid>
          <Link sx={{ margin: "auto" }} to={props.linkPath}>
            {props.linkTitle}
          </Link>
        </Grid>
      </Paper>
    </StyledDiv>
  );
}

export default AuthLayout;
