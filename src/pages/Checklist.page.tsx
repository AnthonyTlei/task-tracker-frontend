import { Box } from "@mui/material";
import { Checklist } from "../features/checklist/components/Checklist";
import { useActiveSection } from "../contexts/ActiveSectionContext";
import { useEffect } from "react";

const ChecklistPage = () => {
  const { setActiveSection } = useActiveSection();
  useEffect(() => {
    setActiveSection("checklist");
    return () => {
      setActiveSection(null);
    };
  }, [setActiveSection]);
  return (
    <Box display={"flex"} flexDirection={"row"} width={"100%"} height={"100%"}>
      <Checklist />
    </Box>
  );
};

export default ChecklistPage;
