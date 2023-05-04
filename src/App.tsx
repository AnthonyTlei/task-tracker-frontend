import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import LoginPage from "./pages/Login.page";
import RegisterPage from "./pages/Register.page";
import HomePage from "./pages/Home.page";
import ChecklistPage from "./pages/Checklist.page";
import TasksPage from "./pages/TasksPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SecuredRoute from "./features/auth/components/SecuredRoute";
import { CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./themes/themes";
import { createContext, useEffect, useMemo, useState } from "react";
import LayoutWrapper from "./layouts/Layout";
import { ActiveSectionProvider } from "./contexts/ActiveSectionContext";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function ThemedApp() {
  return (
    <>
      <CssBaseline />
      <Router>
        <ActiveSectionProvider>
          <LayoutWrapper>
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
          </LayoutWrapper>
        </ActiveSectionProvider>
      </Router>
    </>
  );
}

function App() {
  const savedTheme =
    (localStorage.getItem("theme") as "light" | "dark") || "light";

  const [storageTheme, setStorageTheme] = useState(savedTheme);
  const [mode, setMode] = useState<"light" | "dark">(savedTheme);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(() => {
    return mode === "light" ? lightTheme : darkTheme;
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("theme", mode);
    setStorageTheme(mode);
  }, [theme, storageTheme, mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <ThemedApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
