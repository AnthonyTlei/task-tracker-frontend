import { Box } from "@mui/material";
import { Overview } from "../features/overview/components/Overview";
import { useActiveSection } from "../contexts/ActiveSectionContext";
import { useEffect } from "react";

const HomePage = () => {
  const { setActiveSection } = useActiveSection();
  useEffect(() => {
    setActiveSection("home");
    return () => {
      setActiveSection(null);
    };
  }, [setActiveSection]);
  return (
    <Box display={"flex"} flexDirection={"row"} width={"100%"} height={"100%"}>
      <Overview />
    </Box>
  );
};

export default HomePage;
