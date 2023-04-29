import { Visibility } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
  CardActionArea,
  useTheme,
} from "@mui/material";
import React from "react";

export interface OverviewCardProps {
  title: string;
  count: number;
  Icon: React.ElementType;
}

export const OverviewCard: React.FC<OverviewCardProps> = ({
  title,
  count,
  Icon,
}) => {
  const theme = useTheme();
  return (
    <Card sx={{ width: "250px", height: "auto", borderRadius: "10px" }}>
      <CardContent>
        <Box
          display={"flex"}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <Icon
            fontSize="large"
            sx={{ color: `${theme.palette.primary.light}` }}
          />
          <Box p={2}>
            <Typography variant="body2" color={"secondary"}>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight={"500"} color={"primary.dark"}>
              {count}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActionArea>
        <Divider />
        <Box
          display={"flex"}
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          p={"3px"}
        >
          <Visibility
            fontSize="small"
            sx={{ color: `${theme.palette.secondary.light}` }}
          />
        </Box>
      </CardActionArea>
    </Card>
  );
};
