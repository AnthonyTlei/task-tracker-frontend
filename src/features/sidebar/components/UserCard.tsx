import { Box, Avatar, Typography, useTheme } from "@mui/material";
import { useAppSelector } from "../../../hooks/redux/redux-hooks";

export const UserCard = () => {
  const theme = useTheme();
  const { user } = useAppSelector((state) => state.auth);
  return (
    <Box
      height={"100px"}
      alignItems={"center"}
      display={"flex"}
      px={3}
      marginBottom={"15px"}
    >
      <Avatar
        alt="user-profile-pic"
        sx={{
          width: "56px",
          height: "56px",
          margin: "0 20px 0 0",
          backgroundColor: `${theme.palette.secondary.main}`,
        }}
      >
        <Typography
          color={theme.palette.secondary.contrastText}
          fontWeight={"bold"}
        >
          {user?.first_name[0].toUpperCase()}
          {user?.last_name[0].toUpperCase()}
        </Typography>
      </Avatar>
      <Box width={"56px"}>
        <Typography color={"white"} fontSize={"18px"} fontWeight={"bold"}>
          {user?.first_name}
        </Typography>
        <Typography color={"secondary.light"} variant="body2">
          {user?.role}
        </Typography>
      </Box>
    </Box>
  );
};
