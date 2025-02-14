import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from "react";
import { Pokemon } from "../domain/entities/Pokemon";
import { sortElements } from "utils";

interface FavoritesContextType {
  favorites: Pokemon[];
  nonFavorites: Pokemon[];
  toggleFavorite: (pokemon: Pokemon) => void;
  setPokemonList: (pokemonList: Pokemon[]) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  const toggleFavorite = useCallback((pokemon: Pokemon) => {
    setFavorites((prev) => {
      const updatedFavorites = prev.some((p) => p.id === pokemon.id)
        ? prev.filter((p) => p.id !== pokemon.id)
        : [...prev, pokemon];

      return sortElements(updatedFavorites);
    });
  }, []);

  const nonFavorites = useMemo(
    () =>
      sortElements(
        pokemonList.filter((p) => !favorites.some((f) => f.id === p.id))
      ),
    [pokemonList, favorites]
  );

  const contextValue = useMemo(
    () => ({ favorites, nonFavorites, toggleFavorite, setPokemonList }),
    [favorites, nonFavorites, toggleFavorite]
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
