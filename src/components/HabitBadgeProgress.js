import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Paper, Typography, Popover,} from '@mui/material';
import { borders, Box, sizing } from "@mui/system";

const HabitBadgeProgress = ({title, description, badgeMeta, streakLength, }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);

    return (
    <>
        <Paper 
            elevation={7} 
            sx={{
                backgroundColor: "primary.main",
                alignItems: "center",
                height: "1",
                border: "1px solid #fafafa",
        }}>
            <Box sx={{borderBottom: 1, borderColor: "#fafafa"}}>
                <Typography sx={{
                    fontSize: '1.3rem',
                    color: "#fafafa", 
                    textAlign: "center",
                    alignItems: "center",
                }}>
                    {title}
                </Typography>
            </Box>
            <Grid sx={{
                height: "100%",
                textAlign: "center",
                justifyContent: "center",    
            }}>
                <Box height="100%" width="100%" component="img" 
                    src={badgeMeta.imgUrl} 
                    onMouseEnter={handlePopoverOpen} 
                    onMouseLeave={handlePopoverClose} 
                    sx={{
                        maxHeight: "140px",
                        maxWidth: "200px",
                        margin: "auto",
                        '&:hover': {
                            backgroundColor: 'primary.main',
                            opacity: [0.95],
                        }    
                    }}/>
            </Grid>
                    {/*TYPOGRAPHY FOR RANK BELOW IMAGE
                    <Typography sx={{
                        fontSize: '.8rem',
                        color: "#fafafa",
                        textAlign: "center",
                        justify: "end"
                    }}>{badgeMeta.rank}</Typography>
                    */}
                {/*GRID FOR DESCRIPTION
                <Grid xs={12} md={4}>
                    <Typography sx={{
                        fontSize: '1rem',
                        color: "#fafafa",
                        textAlign: "center",
                        alignItems: "center",
                    }}>
                            {description}
                    </Typography>
                </Grid>*/}
                {/* GRID FOR STREAK
                <Grid xs={12} md={4}>
                    <Typography sx={{
                        fontSize: '1rem',
                        color: "#fafafa",
                        textAlign: "center",
                        alignItems: "center",
                    }}>
                        {streakLength}
                    </Typography>
                </Grid>*/}
        </Paper>
        <Popover
            id="mouse-over-popover"
            sx={{
                pointerEvents: 'none'
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
            PaperProps={{sx:{
                border:"1px solid black",
                width: "200px",
                backgroundColor: "primary.main"
            }}}>   
                <Typography sx={{
                    color: "#fafafa",
                    textAlign: "center", 
                }}>
                        <Box>
                            <Paper elevation="6" sx={{
                                backgroundColor: badgeMeta.color,
                                color: badgeMeta.offColor,
                                width: "95%",
                                height: "95%",
                                margin: "auto",
                                marginTop: "5px",
                                fontSize: "1.2rem"
                            }}>{badgeMeta.rank}</Paper>
                        </Box> 
                        <Box borderBottom="1px solid white" padding="10px" >{description}</Box>
                        <Box                                padding="10px">{streakLength}</Box>
                </Typography>

        </Popover>
    </>
    );
};

export default HabitBadgeProgress;