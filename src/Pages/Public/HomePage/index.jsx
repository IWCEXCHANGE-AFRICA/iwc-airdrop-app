import { useState, useEffect } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { grey } from "../../../constants/colors";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { styles } from "./styles";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useClaimTask, useGetLastClaim } from "../../../Hooks/Claim";
import HardwareIcon from "@mui/icons-material/Hardware";
import CardCarousel from "../../../Components/carousel";
import { formatTime, getRemainingTime } from "../../../utilities/functions";

const spinKeyframes = `@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;

const fadeInKeyframes = `@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}`;

const HomePage = () => {
  const user = useSelector((state) => state.user);
  const [timer, setTimer] = useState(0);
  const { claimTask, loading, error } = useClaimTask();
  const [buttonText, setButtonText] = useState("Claim");
  const [miningRate, setMiningRate] = useState(user?.mining_power);
  const { loading: lastClaimLoading, lastClaimed } = useGetLastClaim();

  // Set timer based on lastClaimed time
  useEffect(() => {
    if (lastClaimed) {
      const timeRemaining = getRemainingTime(lastClaimed)
      setTimer(timeRemaining);
    }
  }, [lastClaimed, lastClaimLoading]);  

  // Start countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => Math.max(prev - 1, 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleClaimTask = async (e) => {
    e.preventDefault();
    const result = await claimTask();

    if (result.success) {
      toast.success("Claim Successful");
      setButtonText("Claim");
      setTimer(43200); // 12 hours in seconds
    } else {
      console.error("Claim Failed:", result.error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <style>{spinKeyframes}</style>
      <style>{fadeInKeyframes}</style>
      <Box
        sx={{
          width: "100%",
          p: 2,
          maxWidth: 550,
          textAlign: "center"
        }}
      >
        {/* Logo */}
        <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
          <Box
            sx={[
              styles.spinningAnimation,
              {
                width: 150,
                height: 150,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }
            ]}
          >
            <img
              style={{ maxWidth: "100%", height: "auto" }}
              src={"/assets/logo.png"}
              alt="Logo"
            />
          </Box>
        </Box>

        {/* Welcome Message */}
        <Typography variant="h5" fontWeight="bold" color="#fff">
          Welcome back
        </Typography>
        <Typography variant="body2" color="#fff">
          {user?.username}
        </Typography>

        {/* Mining Details */}
        <Box sx={{ color: "#fff" }}>
          <Typography variant="h6" sx={{ marginTop: 1, fontWeight: "bold" }}>
            {lastClaimLoading ? "Loading..." : formatTime(timer)}
          </Typography>
          <Typography variant="body2" sx={{ color: grey.three }}>
            Mining Rate: {miningRate} IWCP per hour
          </Typography>
          <Typography variant="body2" sx={{ color: grey.three }}>
            1 IWC = $...
          </Typography>
        </Box>

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: 1, mt: 1, mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<RocketLaunchIcon />}
            sx={[
              styles.boostButton,
              {
                flex: 1,
                textTransform: "none"
              }
            ]}
          >
            Boost
          </Button>

          <Button
            onClick={handleClaimTask}
            disabled={loading || timer > 0} // Disable when loading or timer active
            startIcon={!loading && <HardwareIcon />}
            sx={[styles.claimButton, { flex: 1, textTransform: "none" }]}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : timer > 0 ? (
              `Mining...`
            ) : (
              buttonText
            )}
          </Button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </Box>

        {/* Scrolling Announcements */}
        <Box sx={{ mt: 3 }}>
          <CardCarousel />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
