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
  CircularProgress,
  FormHelperText
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { uselogin } from "../../../Hooks/Auth";
import { grey, native } from "../../../constants/colors";
import { toast } from "react-toastify";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, loading, error } = uselogin();
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
      toast.error("Please fill in all fields.");
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
          Welcome back
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Please enter your details to sign in
        </Typography>
        {error && <FormHelperText error>{error}</FormHelperText>}

        {/* Social Login Buttons */}
        <Box sx={{ display: "flex", gap: 1, mt: 3, mb: 2 }}>
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
        <Divider>or</Divider>

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
          <TextField
            fullWidth
            name="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1
            }}
          >
            <FormControlLabel
              control={<Checkbox />}
              label="Remember me"
              size="small"
            />
            <Typography
              variant="body2"
              sx={{
                textDecoration: "none",
                color: grey.one,
                cursor: "pointer"
              }}
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </Typography>
          </Box>
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
          {loading ? <CircularProgress size={20} color="inherit" /> : "Sign In"}
        </Button>

        {/* Footer */}
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2">
            Don&apos;t have an account?{" "}
            <Typography
              component="span"
              variant="body2"
              sx={{ color: native.primary, cursor: "pointer" }}
              onClick={() => navigate("/sign-up")}
            >
              Create account
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignInForm;
