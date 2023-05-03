import { Edit } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
  CardActionArea,
  useTheme,
  CardHeader,
} from "@mui/material";
import React from "react";

export interface TaskCardProps {
  id: number;
  full_id: string;
  title: string;
  status: string;
  manager: string;
  handleEditClicked: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  id,
  full_id,
  title,
  status,
  manager,
  handleEditClicked,
}) => {
  const theme = useTheme();
  return (
    <Card sx={{ width: "250px", height: "auto", borderRadius: "10px" }}>
      <CardHeader title={full_id} subheader={manager}/>
      <CardContent>
        <Box
          display={"flex"}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <Box p={2}>
            <Typography variant="body2" color={"secondary"}>
              {status}
            </Typography>
            <Typography variant="body2" color={"secondary"}>
              {title}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActionArea onClick={handleEditClicked}>
        <Divider />
        <Box
          display={"flex"}
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          p={"3px"}
        >
          <Edit
            fontSize="small"
            sx={{ color: `${theme.palette.primary.light}` }}
          />
        </Box>
      </CardActionArea>
    </Card>
  );
};
