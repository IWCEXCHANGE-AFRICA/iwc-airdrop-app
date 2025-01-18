import { Box, Stack, Typography, Button } from "@mui/material";
import { styles } from "./styles";
import { useSelector } from "react-redux";

const Header = () => {
  const grosspointbalance = useSelector((state) => state.grosspointbalance);

  return (
    <>
      <Box position="fixed" sx={styles.navbar}>
        <Stack direction={"row"} sx={styles.navRow}>
          <Box>
            <Typography variant="h4" sx={styles.heroTxt}>
              Iwc Mining
            </Typography>
          </Box>
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"left"}
          justifyContent={"end"}
          gap={2}
          sx={{ display: { xs: "flex", md: "flex" } }}
        >
          <Button variant="outlined" sx={styles.pointsBalance}>
            {grosspointbalance.toLocaleString()} IWCP
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default Header;
