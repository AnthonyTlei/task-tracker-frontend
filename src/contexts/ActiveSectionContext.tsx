import { ReactNode, createContext, useContext, useState } from "react";

type ActiveSection = "home" | "checklist" | "tasks" | null;
type ActiveSectionContextType = {
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
};

const ActiveSectionContext = createContext<ActiveSectionContextType>({
  activeSection: null,
  setActiveSection: () => {},
});

export const useActiveSection = () => {
  return useContext(ActiveSectionContext);
};

export const ActiveSectionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  );
};
