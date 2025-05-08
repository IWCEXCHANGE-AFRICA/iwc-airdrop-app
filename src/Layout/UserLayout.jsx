import { Box, CssBaseline } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import { styles } from "./styles";
import CustomMarque from "../Components/Marque";

const Layout = ({ children }) => {
  const location = useLocation();
  const route = location.pathname;

  const noHeader = route === "/homepage" || "";
  const noFooter = route === "/homepage";

  return (
    <Box sx={!noHeader && styles.wrap}>
      <CssBaseline />
      <Box component="main" sx={[!noHeader && styles.contents]}>
        <CustomMarque />

        {!noHeader && <Header sx={styles.navbar} />}

          <Box sx={styles.children}>{children}</Box>

        {!noFooter && <Footer sx={styles.footer} />}
      </Box>
    </Box>
  );
};

export default Layout;
