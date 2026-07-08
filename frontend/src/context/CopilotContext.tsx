"use client";

import React, { createContext, useContext, useState } from "react";

interface CopilotContextType {
  isOpen: boolean;
  toggle: () => void;
}

const CopilotContext = createContext<CopilotContextType>({
  isOpen: true,
  toggle: () => {},
});

export function CopilotProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen((v) => !v);
  return (
    <CopilotContext.Provider value={{ isOpen, toggle }}>
      {children}
    </CopilotContext.Provider>
  );
}

export function useCopilot() {
  return useContext(CopilotContext);
}
