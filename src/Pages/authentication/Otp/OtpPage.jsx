import { useState } from "react";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import { useVerifyEmail } from "../../../Hooks/Auth"; // Adjust import path
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OtpPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // OTP state
  const [isResending, setIsResending] = useState(false); // State for resend button
  const { verifyAndLogin, loading, success, error, resendOtp } =
    useVerifyEmail(); // Assuming resendOtp is part of the custom hook

  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Allow only numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus(); // Focus next input
    }
  };

  const handleSubmit = async () => {
    // Combine OTP array into a single token
    const token = otp.join("");

    if (!token) {
      console.error("OTP is empty or invalid.");
      return;
    }

    try {
      // Attempt to verify and log in
      const result = await verifyAndLogin(token);

      if (result.success) {
        navigate("/authentication/login/login");
      } else {
        console.error("Email Verification Failed:", result.error);
        // Optionally, display a user-friendly error message (e.g., using toast notifications)
        toast.error("Verification failed. Please try again.");
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("An unexpected error occurred:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await resendOtp(); // Assuming resendOtp triggers OTP resend process
      // Optionally, display a success message for resend
    } catch (error) {
      // Handle any errors that occur during resend (e.g., network error)
      console.error("Error resending OTP:", error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 2
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: "100%",
          padding: 4,
          backgroundColor: "#fff",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          textAlign: "center"
        }}
      >
        <Typography variant="h5" component="h1" mb={2}>
          Enter OTP
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={4}>
          Please enter the 6-digit OTP sent to your email.
        </Typography>

        <Grid container spacing={2} justifyContent="center" mb={3}>
          {otp.map((digit, index) => (
            <Grid item key={index}>
              <TextField
                id={`otp-input-${index}`}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                variant="outlined"
                inputProps={{
                  maxLength: 1,
                  style: {
                    textAlign: "center",
                    width: 30,
                    height: 30,
                    fontSize: "1.5rem",
                    padding: "0"
                  }
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2
                  }
                }}
              />
            </Grid>
          ))}
        </Grid>

        <Button
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          sx={{
            py: 1.5,
            backgroundColor: "#D0A106",
            "&:hover": {
              backgroundColor: "#b78c07"
            },
            borderRadius: 50,
            textTransform: "none",
            height: 40
          }}
        >
          {loading ? "Verifying..." : "Submit OTP"}
        </Button>

        {/* Resend OTP Button */}
        <Button
          variant="text"
          onClick={handleResend}
          fullWidth
          sx={{
            py: 1.5,
            textTransform: "none",
            color: "#D0A106",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#b78c07"
            },
            mt: 2
          }}
          disabled={isResending} // Disable button while resending
        >
          {isResending ? "Resending..." : "Resend OTP"}
        </Button>

        {/* Success or error message */}
        {success && (
          <Typography variant="body2" color="green" mt={2}>
            {success}
          </Typography>
        )}

        {error && (
          <Typography variant="body2" color="red" mt={2}>
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default OtpPage;
