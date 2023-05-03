import {
  Card,
  CardContent,
  Box,
  TextField,
  CardActions,
  Button,
  Stack,
  CardHeader,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { TaskStatus } from "../models/task";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/redux/redux-hooks";
import { createTask } from "../taskSlice";
import { useToken } from "../../../hooks/redux/useToken";
import { NewTask } from "../models/newTask";

export interface CreateTaskCardProps {
  handleClose: () => void;
}

export const CreateTaskCard: React.FC<CreateTaskCardProps> = ({
  handleClose,
}) => {
  const [fullId, setFullId] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(TaskStatus.BACKLOG);
  const [manager, setManager] = useState("");
  const token = useToken();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const clearFields = () => {
    setFullId("");
    setTitle("");
    setStatus(TaskStatus.BACKLOG);
    setManager("");
  };

  const handleCreate = () => {
    if (!user) return;
    const newTask: NewTask = {
      full_id: fullId,
      user_id: user.id,
      title,
      status,
      manager,
    };
    dispatch(createTask({ token, newTask }));
    clearFields();
    handleClose();
  };

  const handleCancel = () => {
    clearFields();
    handleClose();
  };

  return (
    <Card sx={{ width: "350px", height: "auto", borderRadius: "10px" }}>
      <CardHeader title="Create Task" sx={{ margin: "0 8px" }} />
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
                value={fullId}
                onChange={(e) => setFullId(e.target.value)}
              />
              <TextField
                color="secondary"
                variant="standard"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Select
                labelId="task-status-select-label"
                id="task-status-select"
                value={status}
                label="Status"
                variant="standard"
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
        <Box p={2} width={"100%"}>
          <Button color="success" onClick={handleCreate}>
            Create
          </Button>
          <Button color="error" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};
