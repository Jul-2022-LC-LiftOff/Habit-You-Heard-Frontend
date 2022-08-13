import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { styled } from "@mui/system";

const StyledButton = styled(Button)({
  height: 100,
});

export default function AddHabit(props) {
  return (
    <ButtonGroup variant="contained">
      <StyledButton size="small">
      <IconButton size="large">
        <DeleteIcon fontSize="large" />
        </IconButton>
      </StyledButton>
      <StyledButton sx={{ width: 250 }}>
        {props.name}
      </StyledButton>
    </ButtonGroup>
  );
}
