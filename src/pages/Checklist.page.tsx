import { Box } from "@mui/material";
import { Checklist } from "../features/checklist/components/Checklist";

const ChecklistPage = () => {
  return (
    <Box display={"flex"} flexDirection={"row"} width={"100%"} height={"100%"}>
      <Checklist />
    </Box>
  );
};

export default ChecklistPage;
