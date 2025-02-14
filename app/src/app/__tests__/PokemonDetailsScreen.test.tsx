import React from "react";
import { render, screen, waitFor } from "@testing-library/react-native";
import { PokemonRepositoryImpl } from "@infrastructure/repositories/PokemonRepositoryImpl";
import { PokemonDetailsScreenLabels } from "@domain/constants/Labels";
import PokemonDetailsScreen from "../pokemondetails/[id]";

jest.mock("@infrastructure/repositories/PokemonRepositoryImpl");

jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  })),
  useLocalSearchParams: jest.fn(() => ({ id: "1" })),
  Stack: {
    Screen: ({ children }: { children: React.ReactNode }) => children,
  },
}));

describe("Given that the user navigates to the Pokémon details page", () => {
  const mockPokemon = {
    name: "Pikachu",
    height: 10,
    weight: 20,
    base_experience: 100,
    sprites: { other: { "official-artwork": { front_default: "mock-url" } } },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("When the page is loading", () => {
    test("Then the user should see the loading indicator", () => {
      render(<PokemonDetailsScreen />);
      expect(screen.getByText(PokemonDetailsScreenLabels.LOADING)).toBeTruthy();
    });
  });

  describe("When the Pokémon details are successfully loaded", () => {
    beforeEach(() => {
      (PokemonRepositoryImpl as jest.Mock).mockImplementation(() => ({
        getDetails: jest.fn().mockResolvedValue(mockPokemon),
      }));
    });

    test("Then the user should see the Pokémon's details", async () => {
      render(<PokemonDetailsScreen />);

      await waitFor(() =>
        expect(
          screen.queryByText(PokemonDetailsScreenLabels.LOADING)
        ).toBeNull()
      );

      expect(screen.getByText("Pikachu")).toBeTruthy();
      expect(
        screen.getByText(`${PokemonDetailsScreenLabels.HEIGHT} 10`)
      ).toBeTruthy();
      expect(
        screen.getByText(`${PokemonDetailsScreenLabels.WEIGHT} 20`)
      ).toBeTruthy();
      expect(
        screen.getByText(`${PokemonDetailsScreenLabels.EXPERIENCE} 100`)
      ).toBeTruthy();
    });
  });

  describe("When the Pokémon details fail to load", () => {
    beforeEach(() => {
      (PokemonRepositoryImpl as jest.Mock).mockImplementation(() => ({
        getDetails: jest.fn().mockRejectedValue(new Error("API Error")),
      }));
    });

    test("Then the user should see an error message", async () => {
      render(<PokemonDetailsScreen />);

      await waitFor(() =>
        expect(
          screen.getByText(PokemonDetailsScreenLabels.ERROR_LOADING)
        ).toBeTruthy()
      );
    });
  });
});
