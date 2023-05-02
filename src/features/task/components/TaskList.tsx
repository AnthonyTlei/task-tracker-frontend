import { Add } from "@mui/icons-material";
import { Backdrop, Box, Button, Grid, Typography } from "@mui/material";
import { TaskCard } from "./TaskCard";
import { useState } from "react";
import { EditTaskCard } from "./EditTaskCard";
import { useAppSelector } from "../../../hooks/redux/redux-hooks";
import { CreateTaskCard } from "./CreateTaskCard";

export const TaskList = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const { tasks } = useAppSelector((state) => state.task);
  const handleEditClose = () => {
    setOpenEdit(false);
  };
  const handleEditOpen = () => {
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
                assignee={task.user_id.toString()}
                manager={task.manager}
                dateAssigned="2021-10-10"
                dateCompleted="2023-10-10"
                handleEditClicked={handleEditOpen}
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
          id="P10000-5"
          title="Task 5"
          status="Status 5"
          assignee="Assignee 5"
          manager="Manager 5"
          dateAssigned="2021-10-10"
          dateCompleted="2023-10-10"
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
