import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={3} sx={{ borderRight: "1px solid gray" }}>
        <Typography
          variant="h4"
          component="div"
          textAlign="center"
          color="#5F9EA0"
        >
          List
        </Typography>
        <List>
          <ListItem>
            <ListItemButton component={Link} to={"/admin/artists"}>
              <ListItemText sx={{ borderBottom: "1px solid gray" }}>
                Artists
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={Link} to={"/admin/albums"}>
              <ListItemText sx={{ borderBottom: "1px solid gray" }}>
                Albums
              </ListItemText>
            </ListItemButton>
          </ListItem>{" "}
          <ListItem>
            <ListItemButton component={Link} to={"/admin/tracks"}>
              <ListItemText sx={{ borderBottom: "1px solid gray" }}>
                Tracks
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>
      <Grid size={9}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Admin;
