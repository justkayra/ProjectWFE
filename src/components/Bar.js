import React from 'react';
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";


const Bar = () => {

    return (
        <AppBar position="relative">
            <Toolbar>
                <IconButton edge="start" aria-label="menu" sx={{mr: 2}}>
                    {/*   <MenuIcon/>*/}
                </IconButton>
                <Typography variant="h6" color="inherit" component="div">
                    Project-W
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Bar;
