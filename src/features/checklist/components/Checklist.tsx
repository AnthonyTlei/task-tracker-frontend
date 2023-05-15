import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TaskTableAdvanced from "./TaskTableAdvanced";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/redux/redux-hooks";
import { getAllTasks } from "../../task/taskSlice";
import { useToken } from "../../../hooks/redux/useToken";
import { useEffect, useState } from "react";
import { GetTasksFilterDTO } from "../../task/models/task";

export const Checklist = () => {
  const theme = useTheme();
  const token = useToken();
  const dispatch = useAppDispatch();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const { tasks, isLoading, isSuccess } = useAppSelector((state) => state.task);
  const [startDate, setStartDate] = useState<Date>(
    new Date(Date.now() - 3 * 30 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState<Date>(new Date());

  useEffect(() => {
    const filters: GetTasksFilterDTO = {
      range: [startDate, endDate],
    };
    dispatch(getAllTasks({ token, filters }));
  }, [dispatch, token, tasks.length, startDate, endDate]);

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
      {isSuccess && !isLoading && (
        <TaskTableAdvanced
          tasks={tasks}
          startDate={startDate}
          endDate={endDate}
          onDateRangeChange={(start, end) => {
            setStartDate(start);
            setEndDate(end);
          }}
        />
      )}
    </Box>
  );
};
