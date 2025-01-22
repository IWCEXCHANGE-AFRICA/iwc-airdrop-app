import { BrowserRouter } from "react-router-dom";
import Router from "./routes/routes";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { theme } from "./theme/theme";
import "./index.css";
import { Provider } from "react-redux";
import store from "./stores";
import UserContextProvider from "./contexts/userContext";
import { ToastContainer } from "react-toastify";
import BalanceProvider from "./contexts/BalanceContext";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <UserContextProvider>
            <BalanceProvider>
              <ToastContainer />
              <Router />
            </BalanceProvider>
          </UserContextProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
