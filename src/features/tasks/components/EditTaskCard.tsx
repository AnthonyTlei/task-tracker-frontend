import {
  Card,
  CardContent,
  Box,
  TextField,
  CardActions,
  Button,
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
    <Card sx={{ width: "250px", height: "auto", borderRadius: "10px" }}>
      <CardContent>
        <Box
          display={"flex"}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <Box p={2}>
            <TextField placeholder={id} />
            <TextField placeholder={title} />
            <TextField placeholder={status} />
            <TextField placeholder={assignee} />
            <TextField placeholder={manager} />
            <TextField placeholder={dateAssigned} />
            <TextField placeholder={dateCompleted} />
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <Button onClick={handleClose}>Save</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </CardActions>
    </Card>
  );
};
