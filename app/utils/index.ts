import { Pokemon } from "@domain/entities/Pokemon";

export const sortElements = (elements: Pokemon[]): Pokemon[] => {
  return elements.sort((a, b) => a.height - b.height);
};
