"use client";

import { useState, createContext } from "react";

// Global Context - Stores all state values of the individual components
export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [showNavModal, setShowNavModal] = useState(false);
  return (
    <GlobalContext.Provider value={{ showNavModal, setShowNavModal }}>
      {children}
    </GlobalContext.Provider>
  );
}
