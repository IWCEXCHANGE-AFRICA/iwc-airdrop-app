import { createTheme, responsiveFontSizes } from "@mui/material";
import { native } from "../constants/colors";

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
      main: native.bg
    },
    success: {
      main: native.primary
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
          fontSize: "14spx"
        },
        sizeMedium: {
          padding: "8px 40px"
        },
        containedPrimary: {
          backgroundColor: native.secondary
        },
        containedInfo: {
          backgroundColor: "#FFF",
          color: "#000",
          "&:hover": {
            color: "red"
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
