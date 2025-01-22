import React from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Header from "../Components/Dashboard/Header";
import Sidebar from "../Components/Dashboard/SideNav";
import { useState } from "react";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = () => setIsSidebarOpen(true);
  const handleSidebarClose = () => setIsSidebarOpen(false);
  const drawerWidth = 30

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header onMenuClick={handleMenuClick} />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pl: {lg: drawerWidth, xs: 0},
            marginTop: "64px", // AppBar height
            marginBottom: "48px" // Footer height
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
