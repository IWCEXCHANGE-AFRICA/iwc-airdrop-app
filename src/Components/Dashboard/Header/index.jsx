import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../../stores/slices/userSlice";

const Header = ({ onMenuClick }) => {
  const _dispatch = useDispatch();
  const navigate = useNavigate();

  function logout() {
    _dispatch(clearUser());
    navigate("/");
  }
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <IconButton
            color="inherit"
            edge="start"
            sx={{ display: { sm: "none" }, marginRight: 1 }}
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Box>
            <img src="/assets/logo.png" width={70} height={70} />
          </Box>
          <Typography
            variant="h6"
            sx={{ display: { lg: "none", xs: "block" } }}
            component="div"
          >
            IWCP DASHBOARD
          </Typography>
        </Box>
        <IconButton onClick={logout} color="inherit" aria-label="logout">
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
