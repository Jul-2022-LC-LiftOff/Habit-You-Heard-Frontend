import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack"
import { Link, Navigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import LinkButton from "./LinkButton";
import { Grid } from "@mui/material";
import ThemeToggle from "../components/ThemeToggle";

const StyledDiv = styled("div")(() => ({
    display: "flex",
    justifyContent: "center",
  }));

export default function BackButtonBar({points, darkMode, onToggleTheme, setUser, setHabits, contentType}){
    function handleSignout(){
        setUser({token: ""})
        setHabits([])
        Navigate("/auth/signin")
    }
    let bubbleContent;
    let bubbleLink;
    if(contentType === "date"){
        const current = new Date();
        bubbleContent = () => `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;
        bubbleLink = "/calendar";
    } else if (contentType === "points"){
        bubbleContent = () => {return (<><u>Points</u><br/>{points}</>);}
        bubbleLink = "/habitsPage";
    }
    return (
    <Grid container alignItems="flex-start">
        <Grid xs={4}>
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
        </Grid>
        <Grid xs={4}>
            <Link to="/" textDecoration="none"> {/*to={bubbleLink*/}
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
                        fontSize: 28,
                        textAlign:"center"
                        }}
                    >
                        {bubbleContent()}
                    </Typography>
                    </Box>
                </StyledDiv>
            </Link>
        </Grid>
        <Grid xs={4}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
                <ThemeToggle darkMode={darkMode} onToggleTheme={onToggleTheme} />
                <LinkButton to="/auth/signin" onClick={()=>{handleSignout()}}>Logout</LinkButton>
            </Stack>
        </Grid>
    </Grid>);
}