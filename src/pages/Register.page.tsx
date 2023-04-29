import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Register } from "../features/auth/components/Register";

const RegisterPage = () => {
  const theme = useTheme();
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
        background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
      }}
    >
      <Register />
    </Box>
  );
};

export default RegisterPage;
