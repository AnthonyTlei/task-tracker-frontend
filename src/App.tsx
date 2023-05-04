import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginPage from "./pages/Login.page";
import RegisterPage from "./pages/Register.page";
import HomePage from "./pages/Home.page";
import ChecklistPage from "./pages/Checklist.page";
import TasksPage from "./pages/TasksPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SecuredRoute from "./features/auth/components/SecuredRoute";
import { CssBaseline } from "@mui/material";

const lightTheme = createTheme({
  typography: {
    fontFamily: "Segoe UI",
  },
  palette: {
    mode: "light",
    background: {
      paper: "#F9FAFB",
      default: "rgba(255, 255, 255, 0.04)",
    },
    common: {
      black: "#1C2536",
      white: "#111927",
    },
    grey: {
      500: "#9DA4AE",
    },
    primary: {
      main: "#1C2536",
      contrastText: "white",
    },
    secondary: {
      main: "#6366F1",
      contrastText: "white",
    },
  },
});

const darkTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#040e1a",
        },
      },
    },
  },
  typography: {
    fontFamily: "Segoe UI",
  },
  palette: {
    mode: "dark",
    background: {
      paper: "#050c19",
      default: "rgba(255, 255, 255, 0.04)",
    },
    common: {
      black: "white",
      white: "white",
    },
    grey: {
      500: "#9DA4AE",
    },
    primary: {
      main: "#1C2536",
      contrastText: "white",
    },
    secondary: {
      main: "#6366F1",
      contrastText: "white",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<SecuredRoute page={<HomePage />} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/checklist"
            element={<SecuredRoute page={<ChecklistPage />} />}
          />
          <Route
            path="/tasks"
            element={<SecuredRoute page={<TasksPage />} />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
