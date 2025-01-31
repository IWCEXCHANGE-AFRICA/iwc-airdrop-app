import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    padding: "16px",
    backgroundColor: "#121212",
    minHeight: "100vh",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  heading: {
    color: "#D0A106",
    fontWeight: "bold",
    marginBottom: "16px"
  },
  message: {
    marginBottom: "32px",
    fontSize: "16px",
    color: "#aaa"
  },
  button: {
    backgroundColor: "#D0A106",
    color: "#000",
    borderRadius: "50px",
    fontWeight: "bold",
    "&:hover": { backgroundColor: "#b78c07" }
  }
};

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/"); // Redirect to the homepage or login page
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" sx={styles.heading}>
        Unauthorized Access
      </Typography>
      <Typography sx={styles.message}>
        You do not have permission to access this page. Please contact support
        or log in with the appropriate account.
      </Typography>
      <Button variant="contained" sx={styles.button} onClick={handleBackToHome}>
        Back to Home
      </Button>
    </Box>
  );
};

export default UnauthorizedPage;
