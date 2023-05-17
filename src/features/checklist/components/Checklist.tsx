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
import OptionsMenu from "../../../shared/components/OptionsMenu";

interface TableOption {
  name: string;
  label: string;
}

const options: TableOption[] = [
  { name: "id", label: "ID" },
  { name: "full_id", label: "Full ID" },
  { name: "title", label: "Title" },
  { name: "manager", label: "Manager" },
  { name: "assignee", label: "Assignee" },
  { name: "status", label: "Status" },
  { name: "date_assigned", label: "Date Assigned" },
  { name: "date_completed", label: "Date Completed" },
];

export const Checklist = () => {

  const theme = useTheme();
  const token = useToken();

  const dispatch = useAppDispatch();
  const { tasks, isLoading, isSuccess } = useAppSelector((state) => state.task);

  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const initialStartDate = new Date(Date.now() - 3 * 30 * 24 * 60 * 60 * 1000);
  const initialEndDate = new Date();

  const [startDate, setStartDate] = useState<Date>(initialStartDate);
  const [endDate, setEndDate] = useState<Date>(initialEndDate);
  const [searchID, setSearchID] = useState("");
  const [filterAssignee, setFilterAssignee] = useState("");
  const [filterStatus, setFilterStatus] = useState<TaskStatus>(
    "" as TaskStatus
  );
  const [usernames, setUsernames] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, boolean>
  >({
    id: false,
    full_id: true,
    title: true,
    assignee: true,
    manager: false,
    status: true,
    date_assigned: false,
    date_completed: false,
  });

  const handleOptionChange = (name: string, checked: boolean) => {
    setSelectedOptions({
      ...selectedOptions,
      [name]: checked,
    });
  };

  const handleDateRangeChange = (newStart: Date, newEnd: Date) => {
    setStartDate(newStart);
    setEndDate(newEnd);
  };

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) =>
        filterAssignee ? task.user.first_name === filterAssignee : true
      )
      .filter((task) => (filterStatus ? task.status === filterStatus : true))
      .filter((task) =>
        searchID
          ? task.full_id.toLowerCase().includes(searchID.toLowerCase())
          : true
      );
  }, [tasks, filterAssignee, filterStatus, searchID]);

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
      <OptionsMenu
        label="Show Columns"
        options={options}
        selectedOptions={selectedOptions}
        onOptionChange={handleOptionChange}
      />
      {isSuccess && !isLoading && (
        <>
          <TaskTableAdvanced
            tasks={filteredTasks}
            selectedOptions={selectedOptions}
            options={options}
          />
        </>
      )}
    </Box>
  );
};
