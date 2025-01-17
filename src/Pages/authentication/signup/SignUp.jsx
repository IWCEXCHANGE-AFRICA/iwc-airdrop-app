import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Link,
  useMediaQuery,
  FormHelperText
} from "@mui/material";
import CenteredLabelTextField from "../../../Components/authentications/Textfield/textfield";
import styles from "./styles";
import { useRegister } from "../../../Hooks/Auth";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { register, error, loading } = useRegister();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    referral_code: ""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = {};
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.email) formErrors.email = "Email is required";
    if (!formData.password) formErrors.password = "Password is required";
    if (!formData.username) formErrors.username = "Username is required";
    if (!formData.referral_code)
      formErrors.referral_code = "Referral code is required";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const result = await register(formData);
    console.log(formData);

    if (result) {
      navigate("/sign-up/otp"); // Navigate to OTP screen
    }
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.formContainer}>
        <img src="/src/assets/logo.png" alt="Logo" style={styles.logo(isMobile)} />
        <Typography variant="h4" sx={styles.heading}>
          Sign Up
        </Typography>
        <Typography variant="body1" sx={styles.subHeading}>
          Create your account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
          <CenteredLabelTextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            error={!!errors.username}
            helperText={errors.username}
          />
          <CenteredLabelTextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <CenteredLabelTextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <CenteredLabelTextField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            type="password"
            error={!!errors.password}
            helperText={errors.password}
          />
          <CenteredLabelTextField
            label="Referral Code"
            name="referral_code"
            value={formData.referral_code}
            onChange={handleInputChange}
            error={!!errors.referral_code}
            helperText={errors.referral_code}
          />
          {error && <FormHelperText error>{error}</FormHelperText>}
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={styles.button}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </Box>
        <Grid container sx={styles.linkContainer}>
          <Link href="/" variant="body2">
            Already have an account? Login
          </Link>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignUpPage;
