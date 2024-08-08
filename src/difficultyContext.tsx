"use client";

import {createContext, useState} from "react";

export type Difficulty = "facil" | "medio" | "dificil" | "imposible";

interface Context {
  selectedCategory: Difficulty;
  setSelectedCategory: (dificultad: Difficulty) => void;
}

export const DifficultyContext = createContext({} as Context);

export function DifficultyProvider({children}: {children: React.ReactNode}) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("facil");

  const setSelectedCategory = (dificultad: Difficulty) => {
    setSelectedDifficulty(dificultad);
  };

  return (
    <DifficultyContext.Provider
      value={{selectedCategory: selectedDifficulty, setSelectedCategory: setSelectedCategory}}
    >
      {children}
    </DifficultyContext.Provider>
  );
}
