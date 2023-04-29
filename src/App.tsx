import "./App.css";
import { colors } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginPage from "./pages/Login";

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
      <LoginPage/>
    </ThemeProvider>
  );
}

export default App;
