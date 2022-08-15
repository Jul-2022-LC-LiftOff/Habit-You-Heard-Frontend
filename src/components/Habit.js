import React from "react";
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

function Habit(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

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
        <Checkbox
          {...props}
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
        {props.name}
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
        <Typography sx={{ p: 2 }}>{props.description}</Typography>
      </Popover>
    </ButtonGroup>
  );
}

export default Habit;
