import {AppBar, Toolbar, Typography} from "@mui/material";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import {NavLink} from "react-router-dom";

const AppToolbar = () => {
    return (
        <AppBar position="static" sx={{backgroundColor: "#5F9EA0", marginBottom: "50px"}}>
            <Toolbar>
                <LibraryMusicIcon/>
                <Typography variant="h6" sx={{flexGrow: 1}}>
                    <NavLink style={{color: "white", textDecoration: "none"}} to="/">Music</NavLink>
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default AppToolbar;