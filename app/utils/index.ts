import { Pokemon } from "@domain/entities/Pokemon";

export const sortElements = (elements: Pokemon[]): Pokemon[] => {
  return elements.sort((a, b) => a.height - b.height);
};

export const extractIdFromUrl = (url: string): number => {
  const parts = url.split("/").filter(Boolean);
  return parseInt(parts[parts.length - 1], 10);
};
