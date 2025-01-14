import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: theme.spacing(2),
  },
  formContainer: {
    maxWidth: 400,
    width: "100%",
    padding: theme.spacing(4),
    backgroundColor: "#fff",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: theme.shape.borderRadius * 2,
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  logo: {
    display: "block",
    margin: "0 auto",
    borderRadius: "50%",
    border: "6px solid #D0A106",
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  description: {
    textAlign: "center",
    marginBottom: theme.spacing(4),
    color: theme.palette.text.secondary,
  },
  loginButton: {
    backgroundColor: "#D0A106",
    color: "#fff",
    textTransform: "none",
    borderRadius: 100,
    "&:hover": {
      backgroundColor: "#b79105",
    },
  },
  linkContainer: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default useStyles;
