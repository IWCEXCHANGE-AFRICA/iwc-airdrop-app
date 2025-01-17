import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Divider,
  CircularProgress,
  FormHelperText
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../../Hooks/Auth";
import { native } from "../../../constants/colors";
import { toast } from "react-toastify";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, loading, error } = useRegister();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    referral_code: ""
  });

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
      toast.error("Please fill in all fields.");

      setErrors(formErrors);
      return;
    }

    try {
      const response = await register(formData);
      console.log("Login successful:", response);
      if (response) {
        navigate("/verify-otp");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "#f8f9fc"
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          bgcolor: "white",
          p: 2,
          borderRadius: 2,
          boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
          textAlign: "center"
        }}
      >
        {/* Logo */}
        <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              width: 50,
              height: 50,
              bgcolor: "#e0e7ff",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <img
              style={{ maxWidth: "100%", height: "auto" }}
              src={"/assets/logo.png"}
              alt="Logo"
            />
          </Box>
        </Box>

        {/* Welcome Message */}
        <Typography variant="h5" fontWeight="bold">
          Welcome
        </Typography>
        <Typography color="text.secondary">
          Please enter your details to sign Up
        </Typography>
        {error && <FormHelperText error>{error}</FormHelperText>}

        {/* Form */}
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            name="name"
            label="Name"
            variant="outlined"
            placeholder="Enter your name"
            sx={{ mb: 1 }}
            value={formData.name}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            name="email"
            label="Email address"
            variant="outlined"
            placeholder="Enter your email"
            sx={{ mb: 1 }}
            value={formData.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            name="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            error={!!errors.password}
            helperText={errors.password}
            sx={{ mb: 1 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            fullWidth
            name="username"
            label="Username"
            variant="outlined"
            placeholder="Enter Username"
            sx={{ mb: 1 }}
            value={formData.username}
            onChange={handleInputChange}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            fullWidth
            name="referral_code"
            label="Referral"
            variant="outlined"
            placeholder="Referral"
            sx={{ mb: 2 }}
            value={formData.referral_code}
            onChange={handleInputChange}
            error={!!errors.referral_code}
            helperText={errors.referral_code}
          />
        </Box>

        {/* Submit Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 1,
            mb: 2,
            py: 1.2,
            textTransform: "none",
            bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.dark" }
          }}
          onClick={handleSubmit}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Sign Up"}
        </Button>

        <Divider>or</Divider>

        {/* Social Login Buttons */}
        <Box sx={{ display: "flex", gap: 1, m: 1 }}>
          <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            sx={{ flex: 1, textTransform: "none" }}
          >
            Google
          </Button>
          <Button
            variant="contained"
            startIcon={<FacebookIcon />}
            sx={{ flex: 1, textTransform: "none" }}
          >
            Facebook
          </Button>
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2">
            Already have an account?{" "}
            <Typography
              component="span"
              variant="body2"
              sx={{ color: native.primary, cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Login
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpForm;
