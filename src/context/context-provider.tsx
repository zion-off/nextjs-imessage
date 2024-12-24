"use client";

import { createContext, useContext, useState } from "react";

interface AppContextType {
  token: string;
  updateToken: (newToken: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState("");
  const updateToken = function (newToken: string) {
    setToken(newToken);
  };
  const value = { token, updateToken };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Context is undefined");
  }
  return context;
}
