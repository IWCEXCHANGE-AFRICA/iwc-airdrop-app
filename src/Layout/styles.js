import { native } from "../constants/colors";

const drawerWidth = 240;
const layoutPad = 32;
const layoutMargin = 6;
const navHeight = 60;

export const styles = {
  wrap: {
    display: "flex",
    width: "100vw",
    maxHeight: "100vh",
    backgroundImage: "url('/assets/img13.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    backgroundBlendMode: "darken"
  },
  contents: {
    flexGrow: 1,
    boxSizing: "border-box",
    width: "100%",
    pl: layoutPad + "px",
    pr: layoutPad + "px",
    pt: navHeight + layoutPad + "px",
    pb: layoutPad + "px",
    p: 3,
    ml: 0 + "px",
    mt: navHeight + layoutPad + "px"
  },
  navbar: {
    backgroundColor: native.bg,
    color: native.default,
    borderRadius: "50px",
    position: "fixed",
    top: 0,
    left: 10,
    right: 10,
    pl: { xs: "10px", md: "10px" },
    pr: layoutPad + "px",
    margin: layoutMargin + "px",
    height: navHeight + "px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "width 0.3s ease-in-out",
    zIndex: 1990
  },

  navRow: {
    direction: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  children: {
    transition: "margin-left 0.3s",
    maxHeight: "100vh",
    height: "80vh"
  },

  heroTxt: {
    fontWeight: 500,
    letterSpacing: "2px",
    textTransform: "uppercase",
    fontSize: "1.5rem",
    color: "#FFFFFF"
  },
  pointsBalance: {
    backgroundColor: "transparent",
    border: `1px solid ${native.default}`,
    borderRadius: 6,
    color: native.primary,
    fontWeight: 500,
    fontSize: "15px",
    letterSpacing: ".3px",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "transparent",
      border: `1px solid ${native.default}`,
      color: "#cccccc",
      transform: "scale(1.05)",
      "&:focus": {
        outline: "none",
        boxShadow: "none",
        border: "none"
      },
      "&:active": {
        outline: "none",
        boxShadow: "none",
        border: "none"
      }
    }
  },
  footer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    borderRadius: "6px",
    backgroundColor: native.bg,
    color: "#fff",
    padding: "10px 20px",
    marginBottom: "-15px",
    boxShadow: `0 -1px 3px rgba(0, 0, 0, 0.1)`,
    transition: "width 0.3s"
  }
};
