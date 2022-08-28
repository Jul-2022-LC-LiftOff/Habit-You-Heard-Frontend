import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Paper, Typography } from '@mui/material';
import { borders, Box, sizing } from "@mui/system";


const HabitBadgeProgress = ({title, description, badgeImgUrl, streakLength}) => {
    return (
        <Paper elevation={7} sx={{
            backgroundColor: "primary.main",
            alignItems: "center",
            margin: "10px"
        }}>
            <Box sx={{borderBottom: 1, borderColor: "#fafafa"}}>
                <Typography sx={{
                    fontSize: '1.2rem',
                    color: "#fafafa", 
                    textAlign: "center",
                    alignItems: "center",
                }}>
                    {title}
                </Typography>
            </Box>
            <Grid container height="100%">
                <Grid xs={12} md={4} textAlign="center">
                    <Box component="img" src={badgeImgUrl} sx={{
 
                        maxWidth: "100%",
                        maxHeight: "200px"
                    }}/>
                    {/*<img src={badgeImgUrl} sx={{maxHeight:"70%", maxWidth:"70%"}}/>*/}
                </Grid>
                <Grid xs={12} md={4}>
                    <Typography sx={{
                        fontSize: '1rem',
                        color: "#fafafa",
                        textAlign: "center",
                        alignItems: "center",
                    }}>
                            {description}
                    </Typography>
                </Grid>
                <Grid xs={12} md={4}>
                    <Typography sx={{
                        fontSize: '1rem',
                        color: "#fafafa",
                        textAlign: "center",
                        alignItems: "center",
                    }}>
                        {streakLength}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default HabitBadgeProgress;