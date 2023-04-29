import "./App.css";
import { colors } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginPage from "./pages/Login.page";
import RegisterPage from "./pages/Register.page";
import HomePage from "./pages/Home.page";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1C2536",
    },
    secondary: {
      main: "#6366F1",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <RegisterPage/> */}
      {/* <LoginPage/> */}
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
