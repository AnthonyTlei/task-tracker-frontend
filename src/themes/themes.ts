import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    status: {
      success: string;
      progress: string;
      pending: string;
      rejected: string;
    };
  }
  interface PaletteOptions {
    status?: {
      success?: string;
      progress?: string;
      pending?: string;
      rejected?: string;
    };
  }
}

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
    status: {
      success: "rgb(16, 185, 129);",
      progress: "rgb(6, 174, 212);",
      pending: "rgb(247, 144, 9)",
      rejected: "rgb(240, 68, 56)",
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
    status: {
      success: "rgb(16, 185, 129);",
      progress: "rgb(6, 174, 212);",
      pending: "rgb(247, 144, 9)",
      rejected: "rgb(240, 68, 56)",
    },
  },
});
