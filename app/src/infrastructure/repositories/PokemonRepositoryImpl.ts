import { Pokemon } from "@domain/entities/Pokemon";
import { PokemonDetail } from "@domain/entities/PokemonDetail";
import { PokemonListResponse } from "@domain/entities/PokemonListResponse";
import { PokemonRepository } from "@domain/repositories/PokemonRepository";
import { extractIdFromUrl } from "utils";

export class PokemonRepositoryImpl implements PokemonRepository {
  async getAll(): Promise<Pokemon[]> {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
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
              `No se pudieron obtener los detalles para ${pokemon.name}`
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
}
