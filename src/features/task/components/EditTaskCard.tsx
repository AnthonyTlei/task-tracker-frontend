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
import React from "react";
import { TaskStatus } from "../models/task";

export interface EditTaskCardProps {
  id: string;
  title: string;
  status: string;
  manager: string;
  handleClose: () => void;
}

export const EditTaskCard: React.FC<EditTaskCardProps> = ({
  id,
  title,
  status,
  manager,
  handleClose,
}) => {
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
                placeholder={id}
                variant="standard"
                label="ID"
              />
              <TextField
                color="secondary"
                placeholder={title}
                variant="standard"
                label="Title"
              />
              <Select
                labelId="task-status-select-label"
                id="task-status-select"
                label="Status"
                value={status}
                variant="standard"
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
            <Button color="success" onClick={handleClose}>
              Save
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Box>
          <Button color="error" onClick={handleClose}>
            Delete
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};
