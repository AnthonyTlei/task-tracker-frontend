import {
  Card,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { TaskStatus } from "../../features/task/models/task";
import { Search } from "@mui/icons-material";
import React from "react";

interface TaskFiltersProps {
  searchID?: string;
  setSearchID?: (searchID: string) => void;
  filterAssignee?: string;
  setFilterAssignee?: (filterAssignee: string) => void;
  filterStatus?: TaskStatus;
  setFilterStatus?: (filterStatus: TaskStatus) => void;
  assignees?: string[];
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  searchID,
  setSearchID,
  filterAssignee,
  setFilterAssignee,
  filterStatus,
  setFilterStatus,
  assignees,
}) => {
  return (
    <Card sx={{maxWidth: "auto"}}>
      <Grid container spacing={2} p={2}>
        {searchID !== undefined && setSearchID && (
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Search by ID"
              value={searchID}
              onChange={(e) =>
                setSearchID ? setSearchID(e.target.value) : null
              }
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
        )}
        {assignees !== undefined && setFilterAssignee && (
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Filter by Assignee"
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
              fullWidth
              select
            >
              <MenuItem value="">All</MenuItem>
              {assignees.map((assignee) => (
                <MenuItem value={assignee} key={assignee}>
                  {assignee}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        )}
        {filterStatus !== undefined && setFilterStatus && (
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Filter by Status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as TaskStatus)}
              fullWidth
              select
            >
              <MenuItem value="">All</MenuItem>
              {Object.values(TaskStatus).map((status) => (
                <MenuItem key={status} value={status}>
                  {status.toUpperCase()}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        )}
        {/* TODO: Make manager values dynamic */}
        {/* <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Filter by Manager"
            value={filterManager}
            onChange={(e) => setFilterManager(e.target.value)}
            fullWidth
            select
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="manager1">Manager 1</MenuItem>
            <MenuItem value="manager2">Manager 2</MenuItem>
          </TextField>
        </Grid> */}
      </Grid>
    </Card>
  );
};
