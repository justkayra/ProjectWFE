import React from 'react';
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {Link} from "react-router-dom";
import {useLocation} from "react-router";

const Bar = () => {
    const location = useLocation();
    return (
        <AppBar position="relative">
            <Toolbar>
                {location.pathname !== '/' &&
                <IconButton edge="start" aria-label="menu" sx={{mr: 2}}>
                    <Link to={"/"}>
                        <ArrowBackIosIcon/>
                    </Link>
                </IconButton>
                }
                <Typography variant="h6" color="inherit" component="div">
                    Project-W
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Bar;
