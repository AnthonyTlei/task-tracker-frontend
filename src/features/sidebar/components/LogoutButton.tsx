import { Box, IconButton } from "@mui/material";
import { useAppDispatch } from "../../../hooks/redux/redux-hooks";
import { logout } from "../../auth/authSlice";
import { Logout } from "@mui/icons-material";

export const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Box p={"10px"}>
      <IconButton
        color="secondary"
        sx={{ cursor: "pointer" }}
        onClick={handleLogout}
      >
        <Logout />
      </IconButton>
    </Box>
  );
};
