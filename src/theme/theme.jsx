import { createTheme, responsiveFontSizes } from "@mui/material";
import { grey, native } from "../constants/colors";

const baseTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1300,
      xl: 1536
    }
  },
  palette: {
    mode: "light",
    primary: {
      main: native.primary
    },
    secondary: {
      main: grey.default
    }
  },
  typography: {
    fontFamily: "Raleway",
    h1: {
      fontFamily: "Raleway",
      fontSize: "56px"
    },
    h2: {
      fontFamily: "Raleway",
      fontSize: "48px"
    },
    h3: {
      fontFamily: "Raleway",
      fontSize: "40px"
    },
    h4: {
      fontFamily: "Rubik",
      fontSize: "32px"
    },
    h5: {
      fontFamily: "Rubik",
      fontSize: "24px"
    },
    h6: {
      fontFamily: "Raleway",
      fontSize: "20px"
    },
    body2: {
      fontFamily: "Rubik",
      fontSize: "14px",
      fontWeight: 400
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: "smooth",
          outline: "none",
          overflowX: "hidden"
        },
        body: {
          fontFamily: "Rubik",
          margin: 0,
          padding: 0,
          outline: "none",
          lineHeight: 1.1,
          fontWeight: 400
        },
        p: {
          margin: 0,
          padding: 0
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "none"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
          fontWeight: 500,
          textTransform: "none",
          fontSize: "14px",
          "&.Mui-disabled": {
            color: "#FFFFFF", // Ensures text color remains white when disabled
            backgroundColor: "rgba(255, 255, 255, 0.3)", // Adjust background transparency if needed
            opacity: 0.5 // Optional: Makes the disabled button look visually different
          }
        },
        sizeMedium: {
          padding: "8px 40px"
        },
        containedPrimary: {
          backgroundColor: native.secondary,
          "&.Mui-disabled": {
            backgroundColor: "rgba(255, 255, 255, 0.3)" // Keeps background light when disabled
          }
        },
        containedInfo: {
          backgroundColor: "#FFF",
          color: "#000",
          "&:hover": {
            color: "red"
          },
          "&.Mui-disabled": {
            color: "#FFFFFF", // Ensures white text for disabled state
            backgroundColor: "rgba(255, 255, 255, 0.3)" // Adjust for a faded look
          }
        }
      }
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          color: "#FFF",
          backgroundColor: "transparent",
          boxShadow: "none",
          "& .Mui-expanded": {
            backgroundColor: native.secondary,
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px"
          }
        }
      }
    }
  }
});

export const theme = responsiveFontSizes(baseTheme);
