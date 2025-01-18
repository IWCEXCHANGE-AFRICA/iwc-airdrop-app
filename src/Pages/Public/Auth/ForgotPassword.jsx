import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  FormHelperText
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForgotPwd } from "../../../Hooks/Auth";
import { toast } from "react-toastify";
import { native } from "../../../constants/colors";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const { forgotPwd, loading, error } = useForgotPwd();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Invalid email format.");
      return;
    }

    try {
      const response = await forgotPwd({ email });
      console.log(response)

      if (response) {
        toast.success("Password reset link sent. Check your email!");
        
        setTimeout(() => {
          navigate("/reset-password");
        }, 5000);
      }
    } catch (err) {
      toast.error("Failed to send reset link. Please try again.");
      console.error("Error:", err);
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
          maxWidth: 300,
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
          boxShadow: "0px 10px 20px rgba(224, 187, 22, 0.65)",
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
              src="/assets/logo.png"
              alt="Logo"
            />
          </Box>
        </Box>

        {/* Welcome Message */}
        <Typography variant="h5" fontWeight="bold">
          Forgot Password
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Enter your registered email to reset your password
        </Typography>
        {error && <FormHelperText error>{error}</FormHelperText>}

        {/* Form */}
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            name="email"
            label="Email address"
            variant="outlined"
            placeholder="Enter your email"
            sx={{ mb: 2 }}
            value={email}
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
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Reset Password"
          )}
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

export default ForgotPasswordForm;
