import { useState } from "react";
import {
  Typography,
  Grid,
  Link,
  useMediaQuery,
  Box,
  Button,
} from "@mui/material";
import CustomTextField from "../../../Components/authentications/Textfield/textfield";
import { uselogin } from "../../../Hooks/Auth"; // Import the hook

const SignIn = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, loading, error } = uselogin();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }

    // Call the login function from the hook
    try {
      const userData = { email: formData.email, password: formData.password };
      const response = await login(userData); // Pass form data to the login function
      console.log("Login successful, response:", response);
      // You can redirect or perform any action on successful login
    } catch (err) {
      console.log("Login error:", err);
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.formContainer}>
        {/* Updated image source to use public folder */}
        <img
          src="/assets/logo.png"
          alt="Logo"
          className={classes.logo}
          style={{
            width: isMobile ? "50px" : "60px",
            height: isMobile ? "50px" : "60px",
          }}
        />
        <Typography variant="h4" component="h1" className={classes.title}>
          Login
        </Typography>
        <Typography variant="body1" className={classes.description}>
          Welcome to Iwc AirDrop. Please enter your details.
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <CustomTextField
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            type="email"
            required
          />
          <CustomTextField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            type="password"
            required
          />
          <Button
            type="submit"
            fullWidth
            className={classes.loginButton}
            disabled={loading} // Disable the button while loading
            sx={{
              backgroundColor: "#b79105", // Default color
              color: "#fff", // Text color white
              borderRadius: "50px",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#a57d04" }, // Darker shade for hover effect
            }}
          >
            {loading ? "Logging in..." : "Login"} {/* Show loading text */}
          </Button>
        </form>

        {/*{error && <Typography variant="body2" color="error">{error}</Typography>}*/}

        <Grid container className={classes.linkContainer}>
          <Link href="/forgot-password" variant="body2">
            Forgot password?
          </Link>
          <Link href="/sign-up" variant="body2">
            Sign Up
          </Link>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignIn;
