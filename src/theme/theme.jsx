import { createTheme } from "@mui/material/styles";

// Define the theme
export const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      }
    }
  }
});
