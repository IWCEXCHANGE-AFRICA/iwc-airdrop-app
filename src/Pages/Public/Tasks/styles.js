import { styled } from "@mui/material/styles";
import { Box, Button, Avatar, Tabs, Tab, Divider } from "@mui/material";

export const FlexContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  flexWrap: theme.breakpoints.down("sm") ? "wrap" : "nowrap",
}));

export const StyledButton = styled(Button)(({ theme, status }) => ({
  backgroundColor: status === "Start" ? "#1db954" : "#ffa500",
  textTransform: "none",
  borderRadius: 20,
  marginTop: theme.breakpoints.down("sm") ? theme.spacing(1) : 0,
}));

export const StyledAvatar = styled(Avatar)(() => ({
  backgroundColor: "#333",
}));

export const StyledTabs = styled(Tabs)(() => ({
  "& .MuiTab-root": {
    color: "#ccc",
    transition: "all 0.3s ease",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#ffa500",
      borderRadius: "8px",
    },
  },
  "& .Mui-selected": {
    color: "#fff",
    fontWeight: "bold",
  },
}));

export const StyledTab = styled(Tab)(() => ({}));

export const StyledDivider = styled(Divider)(() => ({
  backgroundColor: "#333",
}));
