import React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinkButton from "./LinkButton";
import testUser from "../testData/testUser.json";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

const StyledDiv = styled("div")(() => ({
    display: "flex",
    justifyContent: "center",
  }));

export default function Taskbar(props){
    let bubbleContent;
    let bubbleLink;
    if(props.contentType === "date"){
        const current = new Date();
        bubbleContent = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;
        bubbleLink = "calendar";
    } else if (props.contentType === "points"){
        bubbleContent = `${props.points} Points`;
        bubbleLink = "habitsPage";
    }

    return (
        <AppBar sx={{ marginBottom: "15px" }} position="static">
        <Stack direction="row" paddingBottom={4} minHeight="43px">
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ flexGrow: 1, alignSelf: "flex-start" }}
          >
            Hello, {testUser.username}
          </Typography>
          <Stack direction="row" spacing={2}>
            <LinkButton to="..">Home</LinkButton>
            <LinkButton to="yourprogress">Badges</LinkButton>
            <LinkButton to="signin">Logout</LinkButton>
          </Stack>
        </Stack>

        <a href={bubbleLink} textDecoration="none">
          <StyledDiv>
            <Box
              sx={{
                width: 150,
                height: 150,
                borderRadius: 100,
                backgroundColor: "secondary.dark",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: 0
              }}
            >
              <Typography
                sx={{
                  color: "#fafafa",
                  fontSize: 25,
                }}
              >
                {bubbleContent}
              </Typography>
            </Box>
          </StyledDiv>
        </a>
      </AppBar>
    );
}