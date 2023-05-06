import { Button, CircularProgress, Typography, useTheme } from "@mui/material";
import React from "react";

interface LoadingButtonProps {
  content: React.ReactElement | string;
  isLoading: boolean;
  icon: React.ReactElement;
  onClick?: () => void;
  color?: string;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  content,
  isLoading,
  icon,
  onClick,
  color,
}) => {
  const theme = useTheme();
  return (
    <Button
      variant="contained"
      sx={{
        borderRadius: "10px",
        backgroundColor: color ? color : `${theme.palette.primary.main}`,
      }}
      onClick={onClick}
      endIcon={
        isLoading ? (
          <CircularProgress
            size={20}
            sx={{ color: `${theme.palette.grey[100]}` }}
          />
        ) : (
          icon
        )
      }
      component="label"
      disabled={isLoading}
    >
      <Typography color={"white"}>{content}</Typography>
    </Button>
  );
};
