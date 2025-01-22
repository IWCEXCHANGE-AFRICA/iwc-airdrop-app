import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Toolbar,
  Divider,
  Typography
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";
import { grey } from "../../../constants/colors";

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { text: "Dashboard", icon: <DashboardIcon />, link: "/dashboard" },
    { text: "Tasks", icon: <AssignmentIcon />, link: "/tasks" },
    { text: "Users", icon: <PeopleIcon />, link: "/users" }
  ];

  return (
    <>
      {/* Persistent Drawer for Large Screens */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box", backgroundColor: grey.default }
        }}
        open
      >
        <Typography variant="h5" sx={{mt: 1, p:2, color: "#fff"}}>IWCP DASHBOARD</Typography>
        <Divider />
        <Link>
          
        </Link>
        <List>
          {navItems.map((item) => (
            <ListItem
              button
              component={Link}
              to={item.link}
              key={item.text}
              sx={{
                color: grey.two,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "primary.dark",
                  color: "white"
                },
                "&.Mui-selected": {
                  backgroundColor: "primary.dark",
                  color: "white"
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "primary.dark"
                }
              }}
            >
              <ListItemIcon
                sx={{
                  color: "primary.light"
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Temporary Drawer for Small Screens */}
      <Drawer
        variant="temporary"
        open={isOpen}
        onClose={onClose}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" }
        }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem
              button
              component={Link}
              to={item.link}
              key={item.text}
              sx={{
                cursor: "pointer",
                color: grey.two,
                "&:hover": {
                  backgroundColor: "primary.dark",
                  color: "white"
                },
                "&.Mui-selected": {
                  backgroundColor: "primary.dark",
                  color: "white"
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "primary.dark"
                }
              }}
            >
              <ListItemIcon
                sx={{
                  color: "primary.light"
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
