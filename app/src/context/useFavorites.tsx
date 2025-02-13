import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { Pokemon } from "../domain/entities/Pokemon";

interface FavoritesContextType {
  favorites: Pokemon[];
  toggleFavorite: (pokemon: Pokemon) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  const toggleFavorite = (pokemon: Pokemon) => {
    setFavorites((prev) =>
      prev.some((p) => p.id === pokemon.id)
        ? prev.filter((p) => p.id !== pokemon.id)
        : [...prev, pokemon]
    );
  };

  const contextValue = useMemo(
    () => ({ favorites, toggleFavorite }),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites debe usarse dentro de un FavoritesProvider");
  }
  return context;
};

export { FavoritesContext };
