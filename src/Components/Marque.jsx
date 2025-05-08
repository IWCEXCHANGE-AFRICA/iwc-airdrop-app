import { Box, Typography } from "@mui/material";
import { styles } from "../Layout/styles";

function CustomMarque() {
  return (
    <Box
      sx={[
        styles.marque,
        {
          overflow: "hidden",
          whiteSpace: "nowrap",
          display: "flex",
        }
      ]}
    >
      <Typography
        sx={{
          color: "white",
          fontSize: 16,
          fontWeight: "500",
          display: "inline-block",
          animation: "marquee 20s linear infinite",
          "@keyframes marquee": {
            from: { transform: "translateX(100%)" },
            to: { transform: "translateX(-100%)" }
          }
        }}
      >
        Congratulations! IWC Airdrop 2 has Ended

      </Typography>
    </Box>
  );
}

export default CustomMarque;
