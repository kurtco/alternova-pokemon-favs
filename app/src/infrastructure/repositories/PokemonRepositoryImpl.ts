import { API_BASE_URL } from "@domain/constants/ApiConfig";
import { Pokemon } from "@domain/entities/Pokemon";
import { PokemonDetail } from "@domain/entities/PokemonDetail";
import { PokemonListResponse } from "@domain/entities/PokemonListResponse";
import { PokemonRepository } from "@domain/repositories/PokemonRepository";
import { extractIdFromUrl } from "utils";

export class PokemonRepositoryImpl implements PokemonRepository {
  async getAll(): Promise<Pokemon[]> {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data: PokemonListResponse = await response.json();
      const pokemonList = data.results.map(({ name, url }) => ({
        id: extractIdFromUrl(url),
        name,
        url,
      }));

      const detailedPokemonList = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const detailsResponse = await fetch(pokemon.url);
          if (!detailsResponse.ok) {
            throw new Error(
              `No se pudieron obtener los detalles del Pokémon: ${pokemon.name}`
            );
          }
          const details: PokemonDetail = await detailsResponse.json();
          return {
            id: pokemon.id,
            name: pokemon.name,
            height: details.height,
          };
        })
      );

      return detailedPokemonList;
    } catch (error) {
      throw error;
    }
  }

  async getDetails(id: number): Promise<PokemonDetail> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}/`);
      if (!response.ok) {
        throw new Error(
          `No se pudieron obtener los detalles del Pokémon con ID: ${id}`
        );
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}
