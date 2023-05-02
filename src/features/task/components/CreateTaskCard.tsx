import {
  Card,
  CardContent,
  Box,
  TextField,
  CardActions,
  Button,
  Stack,
  CardHeader,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { TaskStatus } from "../models/task";
import { useAppDispatch } from "../../../hooks/redux/redux-hooks";
import { createTask } from "../taskSlice";
import { useToken } from "../../../hooks/redux/useToken";
import { NewUser } from "../../auth/models/newUser";
import { NewTask } from "../models/newTask";

export interface CreateTaskCardProps {
  handleClose: () => void;
}

export const CreateTaskCard: React.FC<CreateTaskCardProps> = ({
  handleClose,
}) => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(TaskStatus.BACKLOG);
  const [manager, setManager] = useState("");
  const token = useToken();
  // const [dateAssigned, setDateAssigned] = useState("");
  // const [dateCompleted, setDateCompleted] = useState("");
  const dispatch = useAppDispatch();

  const handleCreate = () => {
    const newTask: NewTask = {
      // TODO: remove hardcoded user_id
      full_id: id,
      user_id: 1,
      title,
      status,
      manager,
    };
    dispatch(createTask({ token, newTask }));
    handleClose();
  };

  return (
    <Card sx={{ width: "350px", height: "auto", borderRadius: "10px" }}>
      <CardHeader title="Edit" sx={{ margin: "0 8px" }} />
      <CardContent>
        <Box
          display={"flex"}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <Box p={1} width={"100%"}>
            <Stack spacing={3}>
              <TextField
                color="secondary"
                variant="standard"
                label="ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <TextField
                color="secondary"
                variant="standard"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <InputLabel id="task-status-select-label">Task Status</InputLabel>
              <Select
                labelId="task-status-select-label"
                id="task-status-select"
                value={status}
                label="Task Status"
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
              >
                {Object.values(TaskStatus).map((value) => (
                  <MenuItem key={value} value={value}>
                    {value.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                color="secondary"
                variant="standard"
                label="Manager"
                value={manager}
                onChange={(e) => setManager(e.target.value)}
              />
            </Stack>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <Box p={1} width={"100%"}>
          <Button color="success" onClick={handleCreate}>
            Create
          </Button>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};
