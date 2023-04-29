import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

export const Tasks = () => {
  return (
    <Box p={3} width={"100%"} height={"100%"}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        marginBottom={5}
      >
        <Typography variant={"h4"} fontWeight={"500"} color={"primary"}>
          My Tasks
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{ borderRadius: "10px" }}
        >
          <Add sx={{ color: "white" }} />
          <Typography color={"white"} paddingLeft={2}>
            New Task
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};
