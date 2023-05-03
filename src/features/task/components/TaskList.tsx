import { Add } from "@mui/icons-material";
import { Backdrop, Box, Button, Grid, Typography } from "@mui/material";
import { TaskCard } from "./TaskCard";
import { useState } from "react";
import { EditTaskCard } from "./EditTaskCard";
import { useAppSelector } from "../../../hooks/redux/redux-hooks";
import { CreateTaskCard } from "./CreateTaskCard";
import { TaskStatus } from "../models/task";

export const TaskList = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(0);
  const { tasks } = useAppSelector((state) => state.task);
  const handleEditClose = () => {
    setOpenEdit(false);
  };
  const handleEditOpen = (taskId: number) => {
    setSelectedTaskId(taskId);
    setOpenEdit(true);
  };
  const handleCreateOpen = () => {
    setOpenCreate(true);
  };
  const handleCreateClose = () => {
    setOpenCreate(false);
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
          onClick={handleCreateOpen}
        >
          <Add sx={{ color: "white" }} />
          <Typography color={"white"} paddingLeft={2}>
            New Task
          </Typography>
        </Button>
      </Box>
      <Box>
        <Grid container spacing={10}>
          {tasks?.map((task) => (
            <Grid item key={task.id}>
              <TaskCard
                id={task.id}
                full_id={task.full_id}
                title={task.title}
                status={task.status}
                manager={task.manager}
                handleEditClicked={() => handleEditOpen(task.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openEdit}
      >
        <EditTaskCard
          id={selectedTaskId}
          full_id="P10000-5"
          title="Task 5"
          status={TaskStatus.BACKLOG}
          manager="Manager 5"
          handleClose={handleEditClose}
        />
      </Backdrop>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openCreate}
      >
        <CreateTaskCard handleClose={handleCreateClose} />
      </Backdrop>
    </Box>
  );
};
