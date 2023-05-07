import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableFooter,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  MenuItem,
} from "@mui/material";
import { TaskWithUser } from "../models/taskWithUsers";
import { Search } from "@mui/icons-material";

const TaskTable = ({ tasks }: { tasks: TaskWithUser[] }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [searchID, setSearchID] = useState("");
  const [filterAssignee, setFilterAssignee] = useState("");
  const [filterManager, setFilterManager] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Search by ID"
            value={searchID}
            onChange={(e) => setSearchID(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Filter by Assignee"
            value={filterAssignee}
            onChange={(e) => setFilterAssignee(e.target.value)}
            fullWidth
            select
          >
            {/* TODO: Make user names dynamic (create new endpoint for only user.first_name[]) */}
            <MenuItem value="">All</MenuItem>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="root">Root</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Filter by Manager"
            value={filterManager}
            onChange={(e) => setFilterManager(e.target.value)}
            fullWidth
            select
          >
            {/* TODO: Make manager values dynamic */}
            <MenuItem value="">All</MenuItem>
            <MenuItem value="manager1">Manager 1</MenuItem>
            <MenuItem value="manager2">Manager 2</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Filter by Status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            fullWidth
            select
          >
            {/* TODO: Make status values dynamic and use the StatusPill component */}
            <MenuItem value="">All</MenuItem>
            <MenuItem value="backlog">Backlog</MenuItem>
            <MenuItem value="progress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="task table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Full ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Manager</TableCell>
              <TableCell>Assignee</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.id}</TableCell>
                  <TableCell>{task.full_id}</TableCell>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{task.manager}</TableCell>
                  <TableCell>{task.user.first_name}</TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={6}
                count={filteredTasks.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default TaskTable;
