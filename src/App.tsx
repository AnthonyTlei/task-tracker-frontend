import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginPage from "./pages/Login.page";
import RegisterPage from "./pages/Register.page";
import HomePage from "./pages/Home.page";
import ChecklistPage from "./pages/Checklist.page";
import TasksPage from "./pages/TasksPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SecuredRoute from "./features/auth/components/SecuredRoute";

const theme = createTheme({
  typography: {
    fontFamily: "Segoe UI",
  },
  palette: {
    primary: {
      main: "#1C2536",
      contrastText: "#9DA4AE",
    },
    secondary: {
      main: "#6366F1",
      contrastText: "rgba(255, 255, 255, 0.04)",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
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
