"use client";
import { createContext, ReactNode, useState } from "react";

interface MainContextData {
  currentPage: number;
  handleChangePage: (page: number) => void;
}

interface MainProviderProps {
  children: ReactNode;
}

export const MainContext = createContext({} as MainContextData);

export function MainProvider({ children }: MainProviderProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <MainContext.Provider
      value={{
        currentPage,
        handleChangePage,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
