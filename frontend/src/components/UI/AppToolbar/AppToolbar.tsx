import {AppBar, Grid, Toolbar, Typography, Button, Box, Menu, MenuItem} from "@mui/material";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {logout, selectUser} from "../../../features/Users/usersSlice.ts";
import PersonIcon from '@mui/icons-material/Person';
import React, {useState} from "react";

const AppToolbar = () => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    const [userEl, setUserEl] = useState<null | HTMLElement>(null);
    const open = Boolean(userEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setUserEl(event.currentTarget);
    };
    const handleClose = async () => {
        setUserEl(null);
        dispatch(logout(user));
    };

    return (
        <AppBar position="static" sx={{backgroundColor: "#5F9EA0", marginBottom: "50px"}}>
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                <Grid>
                    <Typography variant="h6">
                        <NavLink style={{color: "white", textDecoration: "none"}} to="/">
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <LibraryMusicIcon sx={{display: "block"}}/>
                                <span style={{display: "block"}}>Music</span>
                            </div>
                        </NavLink>
                    </Typography>
                </Grid>
                <Grid>
                    {
                        user ? <Box display="flex" alignItems="center">
                                <span style={{display: "block"}}>{user.username}</span>
                                <Button sx={{color: "white"}} onClick={handleClick}><PersonIcon/></Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={userEl}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                                </Menu>
                                </Box>
                            : <>
                                <Button
                                    sx={{color: "white"}}
                                    component={NavLink}
                                    to="/registration"
                                >Registration</Button>
                                <Button sx={{color: "white"}}>Login</Button>
                                </>
                    }
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default AppToolbar;