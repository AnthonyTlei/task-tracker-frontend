import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Box, Typography } from "@mui/material";

interface Option {
  name: string;
  label: string;
}

interface OptionsMenuProps {
  label: string;
  options: Option[];
  selectedOptions: Record<string, boolean>;
  onOptionChange: (name: string, checked: boolean) => void;
}

export default function OptionsMenu({
  label,
  options,
  selectedOptions,
  onOptionChange,
}: OptionsMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onOptionChange(event.target.name, event.target.checked);
  };

  return (
    <Box>
      <Button
        variant="contained"
        aria-controls="options-menu"
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
        color="secondary"
      >
        <Typography variant="body2" color={"common.white"}>
          {label}
        </Typography>
      </Button>
      <Menu
        id="options-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItem key={option.name}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedOptions[option.name] || false}
                  onChange={handleOptionChange}
                  name={option.name}
                />
              }
              label={option.label}
            />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
