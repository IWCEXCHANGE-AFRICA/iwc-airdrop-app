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
  spinningAnimation: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    animation: `${spin} 5s linear infinite`,
  },
  boostButton: {
    backgroundColor: "#DOA1O6",
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
};
