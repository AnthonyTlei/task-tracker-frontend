import { Box } from "@mui/material";
import { Register } from "../features/auth/components/Register";
import { ToggleDarkMode } from "../shared/components/ToggleDarkMode";

const RegisterPage = () => {
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
      <Register />
    </Box>
  );
};

export default RegisterPage;
