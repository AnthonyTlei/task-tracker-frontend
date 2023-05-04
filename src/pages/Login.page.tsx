import { Box } from "@mui/material";
import { Login } from "../features/auth/components/Login";
import { ToggleDarkMode } from "../shared/components/ToggleDarkMode";

const LoginPage = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    >
      <Box
        position={"fixed"}
        top={16}
        right={16}
      >
        <ToggleDarkMode />
      </Box>
      <Login />
    </Box>
  );
};

export default LoginPage;
