import {
    Box,
    Typography,
    Button,
    Container,
    List,
    ListItem,
    useMediaQuery,
    useTheme,
    Link,
    Stack
  } from "@mui/material";
  import TelegramIcon from "@mui/icons-material/Telegram";
  import { keyframes } from "@mui/system";
  import HowToRegIcon from '@mui/icons-material/HowToReg';
  
  // Define animations
  const floatIn = keyframes`
    from { opacity: 0; transform: translateY(50px); }
    to { opacity: 1; transform: translateY(0); }
  `;
  
  const spin = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `;
  
  const HomePage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          bgcolor: "#1B1B1B",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            py: isMobile ? 6 : 10,
            backgroundImage: `url('https://iwcexchange.io/assets/images/frontend/product/666e3f7ad473f1718501242.png')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: "rgba(27, 27, 27, 0.6)",
              zIndex: 1
            }
          }}
        >
          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            <Box
              component="img"
              src={"/assets/logo.png"}
              alt="IWC Coin Logo"
              sx={{
                width: isMobile ? 80 : 100,
                height: isMobile ? 80 : 100,
                mx: "auto",
                mb: 2,
                animation: `${spin} 4s linear infinite`
              }}
            />
            
            <Typography
              variant={isMobile ? "h4" : "h3"}
              fontWeight="bold"
              color="#FFD700"
              sx={{
                mb: 1,
                textShadow: "2px 2px 4px #000",
                animation: `${floatIn} 1.5s ease forwards`,
                opacity: 0,
                animationDelay: "0.3s"
              }}
            >
              Congratulations! IWC Airdrop 2 Ended
            </Typography>
            
            <Typography
              variant="h6"
              color="#FFF8DC"
              sx={{
                mb: 4,
                textShadow: "2px 2px 4px #000",
                animation: `${floatIn} 1.5s ease forwards`,
                opacity: 0,
                animationDelay: "0.6s"
              }}
            >
              Snapshot and Allocations in Progress
            </Typography>
            
            <Button
              variant="contained"
              startIcon={<TelegramIcon />}
              component={Link}
              href="https://t.me/iwcofficial"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                bgcolor: "#FFD700",
                color: "#1B1B1B",
                fontWeight: "bold",
                py: 1.5,
                px: 3,
                borderRadius: 2,
                textTransform: "none",
                animation: `${floatIn} 1.5s ease forwards`,
                opacity: 0,
                animationDelay: "0.9s",
                "&:hover": {
                  bgcolor: "#FFC300"
                }
              }}
            >
              Join Community
            </Button>
          </Container>
        </Box>
  
        {/* Info Section */}
        <Box
          sx={{
            bgcolor: "#1B1B1B",
            py: isMobile ? 5 : 8,
            flexGrow: 1,
            display: "flex",
            alignItems: "center"
          }}
          id="airdrop"
        >
          <Container maxWidth="lg">
            <Stack spacing={3} alignItems="center" textAlign="center">
              <Typography
                variant={isMobile ? "h4" : "h3"}
                fontWeight="bold"
                color="#FFD700"
                sx={{
                  textShadow: "2px 2px 4px #000",
                  animation: `${floatIn} 1.5s ease forwards`,
                  opacity: 0,
                  animationDelay: "0.3s"
                }}
              >
                Eligibility Criteria
              </Typography>
              
              <List
                sx={{
                  width: "100%",
                  animation: `${floatIn} 1.5s ease forwards`,
                  opacity: 0,
                  animationDelay: "0.6s"
                }}
              >
                {["No bots No Cheat Pass", "Basic Tasks Completion Pass", "Referral Bonus"].map((item, index) => (
                  <ListItem key={index} sx={{ justifyContent: "center" }}>
                    <Typography
                      variant="body1"
                      color="#FFF8DC"
                      textAlign="center"
                      fontSize={isMobile ? "1rem" : "1.1rem"}
                      sx={{ textShadow: "1px 1px 2px #000" }}
                    >
                      {item}
                    </Typography>
                  </ListItem>
                ))}
              </List>
              
              <Button
                variant="contained"
                startIcon={<HowToRegIcon />}
                sx={{
                  bgcolor: "#FFD700",
                  color: "#1B1B1B",
                  fontWeight: "bold",
                  py: 1.5,
                  px: 3,
                  borderRadius: 2,
                  textTransform: "none",
                  animation: `${floatIn} 1.5s ease forwards`,
                  opacity: 0,
                  animationDelay: "0.9s",
                  "&:hover": {
                    bgcolor: "#FFC300"
                  }
                }}
              >
                Register Now
              </Button>
            </Stack>
          </Container>
        </Box>
  
        {/* Footer */}
        <Box sx={{ bgcolor: "#000000", py: 2, textAlign: "center" }}>
          <Typography variant="body2" color="#FFD700" sx={{ textShadow: "1px 1px 2px #000" }}>
            &copy; 2025 IWC Exchange. All rights reserved.
          </Typography>
        </Box>
      </Box>
    );
  };
  
  export default HomePage;