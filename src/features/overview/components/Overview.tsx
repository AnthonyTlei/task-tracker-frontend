import { Add, Done, Pending, Storage } from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  Grid,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { OverviewCard } from "./OverviewCard";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/redux/redux-hooks";
import { fetchTasks } from "../../task/taskSlice";
import { useEffect } from "react";
import { useToken } from "../../../hooks/redux/useToken";
import { TaskStatus } from "../../task/models/task";
import { useState } from "react";

export const Overview = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const dispatch = useAppDispatch();
  const token = useToken();
  const { isLoading, isSuccess, tasks } = useAppSelector((state) => state.task);
  const [tasksDone, setTasksDone] = useState(0);
  const [tasksProgress, setTasksProgress] = useState(0);
  const [tasksBacklog, setTasksBacklog] = useState(0);

  // TODO : refactor 
  const countTasks = () => {
    setTasksDone(0);
    setTasksProgress(0);
    setTasksBacklog(0);
    for (const task of tasks) {
      if (task.status === TaskStatus.DONE) {
        setTasksDone((prev) => prev + 1);
      } else if (task.status === TaskStatus.PROGRESS) {
        setTasksProgress((prev) => prev + 1);
      } else if (task.status === TaskStatus.BACKLOG) {
        setTasksBacklog((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    dispatch(fetchTasks(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (isSuccess) {
      countTasks();
    }
  }, [isSuccess]);

  if (isLoading) {
    return <CircularProgress sx={{ marginTop: "64px" }} color="primary" />;
  }

  return (
    <Box p={3} width={"100%"} height={"100%"}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        marginBottom={5}
        marginTop={isLargeScreen ? 0 : 5}
      >
        <Typography variant={"h4"} fontWeight={"500"} color={"primary"}>
          Overview
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{ borderRadius: "10px" }}
        >
          <Add sx={{ color: "white" }} />
          <Typography color={"white"} paddingLeft={2}>
            New Note
          </Typography>
        </Button>
      </Box>

      <Box marginBottom={2} margin={5}>
        <Typography variant="h6" color={"primary.dark"} gutterBottom>
          Total: {tasks?.length || 0}
        </Typography>
        <Grid container spacing={5}>
          <Grid item>
            <OverviewCard title="Done" count={tasksDone} Icon={Done} />
          </Grid>
          <Grid item>
            <OverviewCard
              title="In Progress"
              count={tasksProgress}
              Icon={Pending}
            />
          </Grid>
          <Grid item>
            <OverviewCard title="Backlog" count={tasksBacklog} Icon={Storage} />
          </Grid>
        </Grid>
      </Box>

      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        marginBottom={5}
        marginTop={5}
      >
        <Typography variant={"h4"} fontWeight={"500"} color={"primary"}>
          Notes
        </Typography>
      </Box>
    </Box>
  );
};
