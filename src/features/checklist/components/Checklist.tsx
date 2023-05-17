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
import { useEffect, useMemo, useState } from "react";
import { GetTasksFilterDTO, TaskStatus } from "../../task/models/task";
import { DateRangePicker } from "../../../shared/components/DateRangePicker";
import { TaskFilters } from "../../../shared/components/TaskFilters";
import authServices from "../../auth/services/auth.service";

export const Checklist = () => {
  const theme = useTheme();
  const token = useToken();
  const dispatch = useAppDispatch();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const { tasks, isLoading, isSuccess } = useAppSelector((state) => state.task);
  const initialStartDate = new Date(Date.now() - 3 * 30 * 24 * 60 * 60 * 1000);
  const initialEndDate = new Date();
  const [startDate, setStartDate] = useState<Date>(initialStartDate);
  const [endDate, setEndDate] = useState<Date>(initialEndDate);
  const [searchID, setSearchID] = useState("");
  const [filterAssignee, setFilterAssignee] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filterManager, setFilterManager] = useState("");
  const [filterStatus, setFilterStatus] = useState<TaskStatus>(
    "" as TaskStatus
  );
  const [usernames, setUsernames] = useState<string[]>([]);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) =>
        filterAssignee ? task.user.first_name === filterAssignee : true
      )
      .filter((task) => (filterManager ? task.manager === filterManager : true))
      .filter((task) => (filterStatus ? task.status === filterStatus : true))
      .filter((task) =>
        searchID
          ? task.full_id.toLowerCase().includes(searchID.toLowerCase())
          : true
      );
  }, [tasks, filterAssignee, filterManager, filterStatus, searchID]);

  useEffect(() => {
    if (!token) return;
    authServices.getUserNames(token).then((res) => {
      setUsernames(res);
    });
  }, [token]);

  useEffect(() => {
    const filters: GetTasksFilterDTO = {
      range: [startDate, endDate],
    };
    dispatch(getAllTasks({ token, filters }));
  }, [dispatch, token, tasks.length, startDate, endDate]);

  const handleDateRangeChange = (newStart: Date, newEnd: Date) => {
    setStartDate(newStart);
    setEndDate(newEnd);
  };

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
      <Box py={2}>
        <DateRangePicker
          startText="Start date"
          endText="End date"
          startDate={initialStartDate}
          endDate={initialEndDate}
          onConfirm={(newStart: Date, newEnd: Date) =>
            handleDateRangeChange(newStart, newEnd)
          }
        />
      </Box>
      <Box py={2}>
        <TaskFilters
          searchID={searchID}
          setSearchID={setSearchID}
          filterAssignee={filterAssignee}
          setFilterAssignee={setFilterAssignee}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          assignees={usernames}
        />
      </Box>
      {isSuccess && !isLoading && (
        <>
          <TaskTableAdvanced tasks={filteredTasks} />
        </>
      )}
    </Box>
  );
};
