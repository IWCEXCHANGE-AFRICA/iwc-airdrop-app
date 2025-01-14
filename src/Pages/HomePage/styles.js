import { keyframes } from "@emotion/react";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "black",
    minHeight: "100vh", // Ensure it fills the screen
  },
  header: {
    textAlign: "center",
    marginBottom: "16px",
  },
  balance: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  spinningAnimation: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    animation: `${spin} 5s linear infinite`,
  },
  miningDetails: {
    textAlign: "center",
    marginBottom: "16px",
  },
  buttonsStack: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    marginTop: "16px",
  },
  boostButton: {
    backgroundColor: "#FF9800",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#e68900",
    },
  },
  claimButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#3e8e41",
    },
  },
  marquee: {
    marginTop: "16px",
    width: "100%",
  },
};
