import React, { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Popover from "@mui/material/Popover";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import { styled } from "@mui/system";

const StyledButton = styled(Button)({
  height: 100,
});

export default function AddHabit(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <ButtonGroup variant="contained">
      <StyledButton size="small">
        <IconButton size="large" onClick={handleClick}>
          <DeleteIcon fontSize="large" />
        </IconButton>
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
          <Alert
            severity="warning"
            action={
              <Button
                color="inherit"
                size="small"
                onClick={props.buttonHandler}
              >
                Stop
              </Button>
            }
          >
            <AlertTitle>Warning</AlertTitle>
            You are about to delete a habit.
          </Alert>
        </Popover>
      </StyledButton>

      <StyledButton sx={{ width: 250 }}>{props.name}</StyledButton>
    </ButtonGroup>
  );
}
