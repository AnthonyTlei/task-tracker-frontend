import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
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

export const darkTheme = createTheme({
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
