import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Divider,
  CircularProgress
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import FacebookIcon from "@mui/icons-material/Facebook";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { uselogin } from "../../../Hooks/Auth";
import { grey, native } from "../../../constants/colors";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, loading } = uselogin();
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await login(formData);
      console.log("Login successful:", response);
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
          p: 4,
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
          Reset Password
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Please enter your details to reset password
        </Typography>

        {/* Form */}
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            name="email"
            label="Email address"
            variant="outlined"
            placeholder="Enter your email"
            sx={{ mb: 2 }}
            value={formData.email}
            onChange={handleInputChange}
          />
        </Box>

        {/* Submit Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            py: 1.2,
            textTransform: "none",
            bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.dark" }
          }}
          onClick={handleSubmit}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Reset Password"}
        </Button>

        {/* Footer */}
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography
            variant="body2"
            sx={{ color: native.primary, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Back to Login
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignInForm;
