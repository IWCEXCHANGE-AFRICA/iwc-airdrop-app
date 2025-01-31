import { Box, CssBaseline, Container } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import { styles } from "./styles";
import CustomMarque from "../Components/Marque";

const Layout = ({ children }) => {
  const location = useLocation();

  const isAuthPage = ["/", "/sign-up"].includes(
    location.pathname.toLowerCase()
  );

  return (
    <Box sx={styles.wrap}>
      <CssBaseline />
      <Box component="main" sx={[styles.contents]}>
      <CustomMarque />

        <Header sx={styles.navbar} />

        <Container>
          <Box sx={styles.children}>{children}</Box>
        </Container>

        <Footer sx={styles.footer} />
      </Box>
    </Box>
  );
};

export default Layout;
