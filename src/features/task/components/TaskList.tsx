import { Add } from "@mui/icons-material";
import { Backdrop, Box, Button, Grid, Typography } from "@mui/material";
import { TaskCard } from "./TaskCard";
import { useEffect, useMemo, useState } from "react";
import { EditTaskCard } from "./EditTaskCard";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/redux/redux-hooks";
import { CreateTaskCard } from "./CreateTaskCard";
import { Task, TaskStatus } from "../models/task";
import { useToken } from "../../../hooks/redux/useToken";
import { getUserTasks } from "../taskSlice";
import { DateRangePicker } from "../../../shared/components/DateRangePicker";
import { TaskFilters } from "../../../shared/components/TaskFilters";

export const TaskList = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { userTasks: tasks } = useAppSelector((state) => state.task);
  const [searchID, setSearchID] = useState("");
  const [filterStatus, setFilterStatus] = useState<TaskStatus>(
    "" as TaskStatus
  );
  const [startDate, setStartDate] = useState<Date>(
    new Date(Date.now() - 3 * 30 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState<Date>(new Date());
  const dispatch = useAppDispatch();
  const token = useToken();

  useEffect(() => {
    // TODO: temporary to reduce api load. (will fail if user has 0 tasks to begin with)
    if (tasks.length === 0) {
      dispatch(getUserTasks(token));
    }
  }, [dispatch, token, tasks.length]);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => (filterStatus ? task.status === filterStatus : true))
      .filter((task) =>
        searchID
          ? task.full_id.toLowerCase().includes(searchID.toLowerCase())
          : true
      )
      .filter((task) => {
        if (task.date_assigned) {
          const date = new Date(task.date_assigned);
          return date >= startDate && date <= endDate;
        }
        return false;
      });
  }, [tasks, startDate, endDate, filterStatus, searchID]);

  const handleEditClose = () => {
    setOpenEdit(false);
    setSelectedTask(null);
  };
  const handleEditOpen = (task: Task) => {
    setSelectedTask(task);
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
        <Typography variant={"h4"} fontWeight={"500"} color={"common.white"}>
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
        <Box py={2}>
          <DateRangePicker
            startText="Start date"
            endText="End date"
            startDate={startDate}
            endDate={endDate}
            onConfirm={(newStart: Date, newEnd: Date) => {
              setStartDate(newStart);
              setEndDate(newEnd);
            }}
          />
        </Box>
        <Box py={2}>
          <TaskFilters
            searchID={searchID}
            setSearchID={setSearchID}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        </Box>
        <Grid container spacing={10}>
          {filteredTasks?.map((task) => (
            <Grid item key={task.id}>
              <TaskCard
                id={task.id}
                full_id={task.full_id}
                title={task.title}
                status={task.status}
                manager={task.manager}
                date_assigned={task.date_assigned}
                date_completed={task.date_completed}
                handleEditClicked={() => handleEditOpen(task)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openEdit}
      >
        {selectedTask && (
          <EditTaskCard
            id={selectedTask.id}
            full_id={selectedTask.full_id}
            title={selectedTask.title}
            status={selectedTask.status}
            manager={selectedTask.manager}
            handleClose={handleEditClose}
          />
        )}
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
