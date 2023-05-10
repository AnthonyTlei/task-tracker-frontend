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
import { NotAuthorizedPage } from "./pages/NotAuthorized.page";
import AdminRoute from "./features/auth/components/AdminRoute";
import AdminDashboardPage from "./pages/AdminDashboard.page";
import ExcelImportSuccessPage from "./pages/ExcelImportSuccess.page";
import ExcelImportWarningsPage from "./pages/ExcelImportWarnings.page";
import ExcelImportFailsPage from "./pages/ExcelImportFails.page";

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
                path="/list"
                element={<SecuredRoute page={<ChecklistPage />} />}
              />
              <Route
                path="/tasks"
                element={<SecuredRoute page={<TasksPage />} />}
              />
              <Route
                path="/admin"
                element={
                  <SecuredRoute
                    page={<AdminRoute element={<AdminDashboardPage />} />}
                  />
                }
              />
              <Route
                path="/admin/import/success"
                element={
                  <SecuredRoute page={<AdminRoute element={<ExcelImportSuccessPage />} />} />
                }
              />
              <Route
                path="/admin/import/warnings"
                element={
                  <SecuredRoute page={<AdminRoute element={<ExcelImportWarningsPage />} />} />
                }
              />
              <Route
                path="/admin/import/fails"
                element={
                  <SecuredRoute page={<AdminRoute element={<ExcelImportFailsPage />} />} />
                }
              />
              <Route path="/not-authorized" element={<NotAuthorizedPage />} />
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
