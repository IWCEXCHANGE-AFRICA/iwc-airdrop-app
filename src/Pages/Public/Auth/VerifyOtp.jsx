import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useVerifyEmail } from "../../../Hooks/Auth"; // Adjust import
import { MuiOtpInput } from "mui-one-time-password-input";

const OtpPage = () => {
  const [otp, setOtp] = useState(""); // OTP state
  const [isResending, setIsResending] = useState(false); // State for resend button
  const { verifyAndLogin, loading, success, error, resendOtp } =
    useVerifyEmail();

  const handleOtpChange = (value) => {
    if (/^\d*$/.test(value)) setOtp(value); // Ensure only numeric input
  };

  const handleSubmit = async () => {
    if (otp.length === 6) {
      await verifyAndLogin(otp); // Pass the token
    } else {
      console.error("OTP must be 6 digits");
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await resendOtp();
    } catch (error) {
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
        <Typography variant="body2" color="textSecondary" mb={4}>
          Please enter the 6-digit OTP sent to your email.
        </Typography>

        <MuiOtpInput
          length={6}
          value={otp}
          onChange={handleOtpChange}
          autoFocus
          sx={{color: '#000000'}}
          inputStyle={{
            width: "2.5rem",
            height: "3rem",
            margin: "0.5rem",
            fontSize: "1.5rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
            textAlign: "center",
          }}
          focusStyle={{
            border: "2px solid #D0A106"
          }}
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          sx={{
            py: 1.5,
            backgroundColor: "#D0A106",
            "&:hover": { backgroundColor: "#b78c07" },
            textTransform: "none",
            height: 40,
            mt: 3
          }}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Submit OTP"}
        </Button>

        <Button
          variant="outlined"
          onClick={handleResend}
          fullWidth
          sx={{
            py: 1.5,
            height: 40,
            textTransform: "none",
            color: "#D0A106",
            "&:hover": { backgroundColor: "transparent", color: "#b78c07" },
            mt: 2
          }}
          disabled={isResending}
        >
          {isResending ? "Resending..." : "Resend OTP"}
        </Button>

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
