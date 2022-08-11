import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";

//TODO: Finish this code and the implement it into the Home.js
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    alignItems: "flex-start",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    "@media all": {
      minHeight: 128,
    },
  }));

function ProminentAppBar(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <StyledToolbar>
          <Typography
            variant="h3" 
            noWrap 
            component="div" 
            sx={{ flexGrow: 1, alignSelf: "flex-start" }}
        >
            {props.children}
          </Typography>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}

export default AppBar;