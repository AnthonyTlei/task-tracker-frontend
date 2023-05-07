import { Box, CircularProgress, Typography, useMediaQuery, useTheme } from "@mui/material";
import TaskTableAdvanced from "./TaskTableAdvanced";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/redux/redux-hooks";
import { getAllTasks } from "../../task/taskSlice";
import { useToken } from "../../../hooks/redux/useToken";
import { useEffect } from "react";

export const Checklist = () => {
  const theme = useTheme();
  const token = useToken();
  const dispatch = useAppDispatch();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const { tasks, isLoading, isSuccess } = useAppSelector((state) => state.task);

  useEffect(() => {
    // TODO: figure out a way to only fetch these once and store them in store then update locally.
    if (tasks.length === 0) {
      dispatch(getAllTasks(token));
    }
  }, [dispatch, token, tasks.length]);

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
          Tasks
        </Typography>
      </Box>
      {isLoading && (
        <CircularProgress sx={{ marginTop: "64px" }} color="primary" />
      )}
      {isSuccess && !isLoading && <TaskTableAdvanced tasks={tasks} />}
    </Box>
  );
};
