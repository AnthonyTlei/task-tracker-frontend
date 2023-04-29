import "./App.css";
import { colors, Grid, Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.deepPurple[500],
    },
    secondary: {
      main: colors.indigo[500],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RegisterPage/>
    </ThemeProvider>
  );
}

export default App;
