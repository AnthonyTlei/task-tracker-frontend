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
  Alert,
  Snackbar,
  CircularProgress,
  IconButton,
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
import { Close } from "@mui/icons-material";

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
  const [error, setError] = useState("");

  const token = useToken();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const validateFields = (newTask: NewTask): boolean => {
    if (fullId.length === 0) {
      setError("ID cannot be empty.");
      return false;
    }
    if (title.length === 0) {
      setError("Title cannot be empty");
      return false;
    }
    if (manager.length === 0) {
      setError("Manager cannot be empty");
      return false;
    }
    setError("");
    return true;
  };

  const clearFields = () => {
    setFullId("");
    setTitle("");
    setStatus(TaskStatus.BACKLOG);
    setManager("");
    setError("");
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
    if (validateFields(newTask)) {
      dispatch(createTask({ token, newTask }));
      clearFields();
      handleClose();
    }
  };

  const handleCancel = () => {
    clearFields();
    handleClose();
  };

  const handleErrorClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setError("");
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleErrorClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      {error !== "" && (
        <Snackbar open autoHideDuration={3000} action={action}>
          <Alert
            onClose={handleErrorClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      )}
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
    </>
  );
};
