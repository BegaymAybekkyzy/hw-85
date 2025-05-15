import {
  AppBar,
  Grid,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem, Avatar,
} from '@mui/material';
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import {
  systemLogout,
  selectUser,
} from "../../../features/Users/usersSlice.ts";
import React, { useState } from "react";
import { logout } from "../../../features/Users/userThunks.ts";
import { BASE_URL } from '../../../constants.ts';

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [userEl, setUserEl] = useState<null | HTMLElement>(null);
  const open = Boolean(userEl);
  const avatarUrl = user ? BASE_URL + "/" + user.avatar : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUserEl(event.currentTarget);
  };

  const handleClose = () => {
    setUserEl(null);
  };

  const onLogout = async () => {
    await dispatch(logout());
    dispatch(systemLogout());
    setUserEl(null);
    navigate("/");
  };

  const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  };

  const stringAvatar = (name: string) => {
    const parts = name.trim().split(' ');
    const first = parts[0]?.[0] || '';
    const second = parts[1]?.[0] || '';
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${first}${second}`,
    };
  };


  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#5F9EA0", marginBottom: "50px" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid>
            <Typography variant="h6">
              <NavLink
                style={{ color: "white", textDecoration: "none" }}
                to="/"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <LibraryMusicIcon sx={{ display: "block" }} />
                  <span style={{ display: "block" }}>Music</span>
                </div>
              </NavLink>
            </Typography>
          </Grid>
          {user && (
            <>
              <Grid>
                <Button
                  sx={{ color: "white" }}
                  component={NavLink}
                  to={"/add-artist"}
                >
                  Add artist
                </Button>
              </Grid>
              <Grid>
                <Button
                  sx={{ color: "white" }}
                  component={NavLink}
                  to={"/add-album"}
                >
                  Add album
                </Button>
              </Grid>
              <Grid>
                <Button
                  sx={{ color: "white" }}
                  component={NavLink}
                  to={"/add-track"}
                >
                  Add track
                </Button>
              </Grid>
            </>
          )}
        </Grid>

        <Grid>
          {user ? (
            <Box display="flex" alignItems="center">
              <span style={{ display: "block" }}>{user.displayName}</span>
              <Button sx={{ color: "white" }} onClick={handleClick}>
                {user.avatar ?
                  <Avatar alt={user.displayName} src={avatarUrl} />
                  :  <Avatar {...stringAvatar(user.displayName)} />
                }
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={userEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <NavLink
                    style={{ textDecoration: "none", color: "inherit" }}
                    to="track-history"
                  >
                    Track history
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <NavLink
                    style={{ textDecoration: "none", color: "inherit" }}
                    to="unpublished-ones"
                  >
                    My unpublished ones
                  </NavLink>
                </MenuItem>

                {user.role === "admin" && (
                  <MenuItem onClick={handleClose}>
                    <NavLink
                      style={{ textDecoration: "none", color: "inherit" }}
                      to="/admin/artists"
                    >
                      Admin Menu
                    </NavLink>
                  </MenuItem>
                )}

                <MenuItem onClick={onLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <>
              <Button
                sx={{ color: "white" }}
                component={NavLink}
                to="/registration"
              >
                Registration
              </Button>
              <Button
                sx={{ color: "white" }}
                component={NavLink}
                to="/authentication"
              >
                Login
              </Button>
            </>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
