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
import { deleteTask, editTask } from "../taskSlice";
import { useToken } from "../../../hooks/redux/useToken";
import { NewTask } from "../models/newTask";

export interface EditTaskCardProps {
  id: number;
  full_id: string;
  title: string;
  status: TaskStatus;
  manager: string;
  handleClose: () => void;
}

export const EditTaskCard: React.FC<EditTaskCardProps> = ({
  id,
  full_id,
  title,
  status,
  manager,
  handleClose,
}) => {
  const [newFullId, setNewFullId] = useState(full_id);
  const [newTitle, setNewTitle] = useState(title);
  const [newStatus, setNewStatus] = useState(status);
  const [newManager, setNewManager] = useState(manager);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const token = useToken();

  const clearFields = () => {
    setNewFullId(full_id);
    setNewTitle(title);
    setNewStatus(status);
    setNewManager(manager);
  };

  const handleTaskEdit = () => {
    // TODO: validate fields
    const newTask: NewTask = {
      full_id: newFullId,
      user_id: user?.id || 0,
      title: newTitle,
      status: newStatus,
      manager: newManager,
    };
    dispatch(editTask({ token, taskId: id, newTask }));
    clearFields();
    handleClose();
  };

  const handleCancel = () => {
    clearFields();
    handleClose();
  };

  const handleTaskDelete = () => {
    // TODO: confirmation popup
    dispatch(deleteTask({ token, taskId: id }));
    clearFields();
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
                value={newFullId}
                variant="standard"
                label="ID"
                placeholder={full_id}
                onChange={(e) => setNewFullId(e.target.value)}
              />
              <TextField
                color="secondary"
                value={newTitle}
                variant="standard"
                label="Title"
                placeholder={title}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <Select
                labelId="task-status-select-label"
                id="task-status-select"
                label="Status"
                variant="standard"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as TaskStatus)}
              >
                {Object.values(TaskStatus).map((value) => (
                  <MenuItem key={value} value={value}>
                    {value.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                color="secondary"
                placeholder={manager}
                variant="standard"
                label="Manager"
                value={newManager}
                onChange={(e) => setNewManager(e.target.value)}
              />
            </Stack>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <Box
          p={1}
          width={"100%"}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Box>
            <Button color="success" onClick={handleTaskEdit}>
              Save
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Box>
          <Button color="error" onClick={handleTaskDelete}>
            Delete
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};
