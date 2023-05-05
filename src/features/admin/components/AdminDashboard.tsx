import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

export const AdminDashboard = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <Box p={3} width={"100%"} height={"100%"}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        marginBottom={5}
        marginTop={isLargeScreen ? 0 : 5}
      >
        <Typography variant={"h4"} fontWeight={"500"} color={"common.white"}>
          Admin Dashboard
        </Typography>
      </Box>
    </Box>
  );
};
