import { Add } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { TaskCard } from "./TaskCard";
import { useState } from "react";
import { EditTaskCard } from "./EditTaskCard";

export const TaskList = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
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
      <Box>
        <Grid container spacing={10}>
          <Grid item>
            <TaskCard
              id="P10000-1"
              title="Task 1"
              status="Status 1"
              assignee="Assignee 1"
              manager="Manager 1"
              dateAssigned="2021-10-10"
              dateCompleted="2023-10-10"
              handleEditClicked={handleOpen}
            />
          </Grid>
        </Grid>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <EditTaskCard
          id="P10000-5"
          title="Task 5"
          status="Status 5"
          assignee="Assignee 5"
          manager="Manager 5"
          dateAssigned="2021-10-10"
          dateCompleted="2023-10-10"
          handleClose={handleClose}
        />
      </Backdrop>
    </Box>
  );
};
