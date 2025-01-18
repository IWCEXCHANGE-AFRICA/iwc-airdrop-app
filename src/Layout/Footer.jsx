/* eslint-disable react/prop-types */
import { Box, Stack, Tabs, Tab } from "@mui/material";
import { styles } from "./styles";
import HomeIcon from "@mui/icons-material/Home";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Link } from "react-router-dom";
import { useState } from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { native } from "../constants/colors";
import { Logout } from "@mui/icons-material";

import { clearUser } from "../stores/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Footer = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const _dispatch = useDispatch();
  const navigate = useNavigate();

  function logout() {
    _dispatch(clearUser());
    navigate("/");
  }
  return (
    <>
      <Box position="fixed" sx={styles.footer}>
        <Stack direction={"row"} gap={2}>
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            TabIndicatorProps={{
              style: { display: "none" },
              color: "#fff"
            }}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              pb: 1,
              "& .MuiTab-root": {
                color: "gray" // Inactive tab color
              },
              "& .Mui-selected": {
                color: native.primary // Active tab color
              }
            }}
          >
            <Tab
              icon={<HomeIcon sx={{ fontSize: 28 }} />}
              label="Home"
              component={Link}
              to="/homepage"
              sx={{
                fontSize: "10px",
                minHeight: 0,
                padding: 0,
                textTransform: "none"
              }}
            />
            <Tab
              icon={<TaskAltIcon sx={{ fontSize: 28 }} />}
              label="Tasks"
              component={Link}
              to="/task"
              sx={{
                fontSize: "10px",
                minHeight: 0,
                padding: 0,
                textTransform: "none"
              }}
            />
            <Tab
              icon={<GroupAddIcon sx={{ fontSize: 28 }} />}
              label="Referral"
              component={Link}
              to="/friends-reward"
              sx={{
                fontSize: "10px",
                minHeight: 0,
                padding: 0,
                textTransform: "none"
              }}
            />
            <Tab
              icon={<Logout sx={{ fontSize: 28 }} />}
              label="Logout"
              component={Link}
              to="/friends-reward"
              onClick={logout}
              sx={{
                fontSize: "10px",
                minHeight: 0,
                padding: 0,
                textTransform: "none"
              }}
            />
          </Tabs>
        </Stack>
      </Box>
    </>
  );
};

export default Footer;
