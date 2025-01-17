import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  IconButton,
  InputAdornment,
  InputLabel
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useResetPwd } from "../../../Hooks/Auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "", // Add email here if needed
    password: "",
    confirmPassword: "",
    otp: ""
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  const [message, setMessage] = useState("");
  const { resetPwd, error, loading } = useResetPwd();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOtpChange = (value) => {
    if (/^\d*$/.test(value)) {
      setFormData((prev) => ({ ...prev, otp: value }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword, otp } = formData;

    if (!password || !confirmPassword || !otp) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (otp.length !== 6) {
      setMessage("Please enter a 6-digit OTP.");
      return;
    }

    try {
      const data = {
        password: formData.password,
        otp: formData.otp
      };
      const response = await resetPwd(data);

      console.log(response);

      if (response) {
        toast.success("Password reset successful.");
        setTimeout(() => {
          navigate("/");
        }, 5000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Password reset failed. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f8f9fc",
        px: 2
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: "100%",
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
          textAlign: "center"
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Reset Password
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Please enter your new password below.
        </Typography>

        <Box component="form" noValidate sx={{ mt: 2 }} onSubmit={handleSubmit}>
          <InputLabel sx={{ textAlign: "left", fontSize: 12 }}>
            Enter 6 digit OTP sent to your email
          </InputLabel>
          <MuiOtpInput
            length={6}
            value={formData.otp}
            onChange={handleOtpChange}
            autoFocus
            sx={{ mb: 2 }}
            inputStyle={{
              width: "2.5rem",
              height: "3rem",
              margin: "0.5rem",
              fontSize: "1.5rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              textAlign: "center"
            }}
            focusStyle={{
              border: "2px solid #D0A106"
            }}
          />

          <TextField
            label="New Password"
            name="password"
            type={showPassword.password ? "text" : "password"}
            fullWidth
            variant="outlined"
            value={formData.password}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility("password")}
                    edge="end"
                  >
                    {showPassword.password ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type={showPassword.confirmPassword ? "text" : "password"}
            fullWidth
            variant="outlined"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    edge="end"
                  >
                    {showPassword.confirmPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          {message && (
            <Typography variant="body2" color="error" mb={2}>
              {message}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              py: 1.5,
              textTransform: "none",
              fontSize: "1rem",
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" }
            }}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Reset Password"}
          </Button>
        </Box>

        <Box mt={2}>
          <Link href="/" variant="body2" color="primary.main" underline="hover">
            Back to Login
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;
