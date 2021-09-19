import React from 'react';
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";

const Bar = () => {

    return (
        <AppBar position="relative" style={{backgroundColor: 'FFD740FF'}}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                    {/*   <MenuIcon/>*/}
                </IconButton>
                <Typography variant="h6" color="inherit" component="div">
                    ProjectW
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Bar;
