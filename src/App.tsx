import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginPage from "./pages/Login.page";
import RegisterPage from "./pages/Register.page";
import HomePage from "./pages/Home.page";
import ChecklistPage from "./pages/Checklist.page";
import TasksPage from "./pages/TasksPage";

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
      {/* <RegisterPage/> */}
      {/* <LoginPage/> */}
      {/* <HomePage /> */}
      <ChecklistPage/>
      {/* <TasksPage/> */}
    </ThemeProvider>
  );
}

export default App;
