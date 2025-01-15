const styles = {
  container: {
    padding: "16px",
    backgroundColor: "#121212",
    minHeight: "100vh",
    color: "#fff"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px"
  },
  balance: {
    color: "#D0A106",
    fontWeight: "bold"
  },
  spinningAnimation: {
    width: "150px",
    height: "150px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    animation: "spin 2s linear infinite", // Ensure the image spins
    margin: "0 auto", // Centers the container horizontally
    marginTop: "40px" // Adds space above the spinning container
  },
  miningDetails: {
    textAlign: "center",
    marginTop: "32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Ensures the text is horizontally centered
    gap: "15px", // Optional: Adds spacing between elements
    animation: "fadeIn 2s ease-in-out" // Add fade-in animation
  },
  buttonsStack: {
    marginTop: "16px",
    display: "flex",
    justifyContent: "center",
    gap: "16px"
  },
  boostButton: {
    backgroundColor: "#D0A106",
    color: "#000",
    borderRadius: "50px",
    fontWeight: "bold",
    "&:hover": { backgroundColor: "#b78c07" }
  },
  claimButton: {
    backgroundColor: "green",
    color: "#fff",
    borderRadius: "50px",
    fontWeight: "bold",
    "&:disabled": { backgroundColor: "#333", color: "#fff" }
  },
  claimButtonDisabled: {
    backgroundColor: "#fff",
    color: "#fff",
    cursor: "not-allowed"
  },
  claimButtonSuccess: {
    backgroundColor: "green", // Green when claimed successfully
    color: "#fff",
    borderRadius: "50px",
    fontWeight: "bold",
    "&:hover": { backgroundColor: "#388e3c" }
  },
  marquee: {
    marginTop: "32px",
    padding: "16px",
    borderRadius: "8px"
  }
};
import { Box, Button, Typography, Modal, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import CardCarousel from "../../Components/Homepage/carousel";
import { useClaimTask } from "../../Hooks/Claim";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress'

// Adding keyframes for spinning animation
const spinKeyframes = `@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;

// Adding keyframes for fade-in animation
const fadeInKeyframes = `@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}`;

const HomePage = () => {
  const user = useSelector((state) => state.user);
  const [balance, setBalance] = useState(120);
  const [mined, setMined] = useState(9);
  const [miningRate, setMiningRate] = useState(user?.mining_power);
  const [boostModalOpen, setBoostModalOpen] = useState(false);
  const { claimTask, loading, error } = useClaimTask();
  const [timer, setTimer] = useState(0);
  const [buttonText, setButtonText] = useState("Claim");

  console.log(user);

  useEffect(() => {
    // Load timer from localStorage on mount
    const storedTimer = localStorage.getItem("claimTimer");
    if (storedTimer) {
      const timeRemaining = parseInt(storedTimer) - Date.now();
      if (timeRemaining > 0) {
        setTimer(Math.ceil(timeRemaining / 1000));
      } else {
        localStorage.removeItem("claimTimer");
      }
    }
  }, []);

  useEffect(() => {
    // Start countdown if timer is active
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            clearInterval(interval);
            localStorage.removeItem("claimTimer");
          }
          return newTime;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Format time function
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}hr(s) ${mins}m ${secs}s`;
  };

  const handleClaimTask = async (e) => {
    e.preventDefault();
    const userData = { miningPower: user.mining_power, userId: user.id };
    const result = await claimTask(userData);

    console.log(result);

    if (result.success) {
      toast.success("Task Claimed Successfully");
      setButtonText("Mine");
      setTimer(60);
      localStorage.setItem("claimTimer", Date.now() + 60000);
    } else {
      console.error("Task Claim Failed:", result.error);
    }
  };

  // Handle Boost Function
  const handleBoost = (amount) => {
    setBalance(balance + amount); // Add boost amount to balance
    setBoostModalOpen(false); // Close modal
  };

  return (
    <Box sx={styles.container}>
      {/* Inject keyframes for spinning and fade-in animations */}
      <style>{spinKeyframes}</style>
      <style>{fadeInKeyframes}</style>

      {/* Header Section */}
      <Box sx={styles.header}>
        <Typography variant="h5">Account Balance</Typography>
        <Typography variant="h6" sx={styles.balance}>
          {balance.toLocaleString()} IWCP
        </Typography>
      </Box>

      {/* Spinning Wallet Image */}
      <Box sx={styles.spinningAnimation}>
        <img
          src="/src/Components/assets/logo.png" // Ensure logo.png is in the correct folder
          alt="Spinning Wallet"
          style={{ width: "100%", height: "100%" }}
        />
      </Box>

      {/* Mining Details */}
      <Box sx={styles.miningDetails}>
        <Typography variant="h6" fontWeight="bold">
          IWCP Reward: {mined.toLocaleString()}
        </Typography>
        <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
          Timer: {formatTime()}
        </Typography>
        <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
          Mining Rate: {miningRate} IWCP per hour
        </Typography>
      </Box>

      {/* Buttons */}
      <Box sx={styles.buttonsStack}>
        <Button
          variant="contained"
          sx={styles.boostButton}
          onClick={() => setBoostModalOpen(true)}
        >
          Boost
        </Button>
        <Button
          variant="contained"
          sx={styles.claimButton}
          onClick={handleClaimTask}
          disabled={loading || timer > 0} // Disable when loading or timer active
        >
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : timer > 0 ? (
            `Wait ${timer}s`
          ) : (
            buttonText
          )}
        </Button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Box>

      {/* Boost Modal */}
      <Modal open={boostModalOpen} onClose={() => setBoostModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            p: 4,
            bgcolor: "#222",
            color: "#fff",
            boxShadow: 24,
            borderRadius: "8px",
            width: "300px",
            textAlign: "center"
          }}
        >
          <Typography variant="h6" mb={2}>
            Boost Options
          </Typography>
          <TextField
            fullWidth
            type="number"
            label="Amount (BNB or USDT)"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            sx={styles.boostButton}
            fullWidth
            onClick={() => handleBoost(1000)} // Example amount
          >
            Deposit
          </Button>
        </Box>
      </Modal>

      {/* Scrolling Announcements */}
      <Box sx={styles.marquee}>
        <CardCarousel />
      </Box>
    </Box>
  );
};

export default HomePage;
