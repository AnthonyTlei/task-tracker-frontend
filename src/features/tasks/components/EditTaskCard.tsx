import {
  Card,
  CardContent,
  Box,
  TextField,
  CardActions,
  Button,
  Stack,
  CardHeader,
} from "@mui/material";
import React from "react";

export interface EditTaskCardProps {
  id: string;
  title: string;
  status: string;
  manager: string;
  assignee: string;
  dateAssigned: string;
  dateCompleted: string;
  handleClose: () => void;
}

export const EditTaskCard: React.FC<EditTaskCardProps> = ({
  id,
  title,
  status,
  manager,
  assignee,
  dateAssigned,
  dateCompleted,
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
              <TextField
                color="secondary"
                placeholder={status}
                variant="standard"
                label="Status"
              />
              <TextField
                color="secondary"
                placeholder={manager}
                variant="standard"
                label="Manager"
              />
              <TextField
                color="secondary"
                placeholder={assignee}
                variant="standard"
                label="Assignee"
              />
              <TextField
                color="secondary"
                placeholder={dateAssigned}
                variant="standard"
                label="Date Assigned"
              />
              <TextField
                color="secondary"
                placeholder={dateCompleted}
                variant="standard"
                label="Date Completed"
              />
            </Stack>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <Box p={1} width={"100%"}>
          <Button onClick={handleClose}>Save</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </CardActions>
    </Card>
  );
};
