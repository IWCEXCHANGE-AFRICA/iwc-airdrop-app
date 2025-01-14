import React from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Header from "../Components/Dashboard/Header/header";
import Sidebar from "../Components/Dashboard/sideNavBar/sidenav";
import Footer from "../Components/Dashboard/Footer/footer";

const AdminLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden"
      }}
    >
      <CssBaseline />
      <Header />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto"
          }}
        >
          <Toolbar /> {/* Adds spacing below the header */}
          {children} {/* Renders nested content */}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default AdminLayout;
