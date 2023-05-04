import { Backdrop, Box, Paper, Typography } from "@mui/material";

export const Settings = () => {
  return (
    <Backdrop open={true}>
      <Box p={2} borderRadius={"10px"}>
        <Paper sx={{ p: 2 }}>
          <Typography variant={"h4"} color={"common.white"} fontWeight={"bold"}>
            Settings
          </Typography>
        </Paper>
      </Box>
    </Backdrop>
  );
};
