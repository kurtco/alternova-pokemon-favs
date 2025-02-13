import { Pokemon } from "@domain/entities/Pokemon";
import { PokemonRepository } from "@domain/repositories/PokemonRepository";

export class PokemonRepositoryImpl implements PokemonRepository {
  async getAll(): Promise<Pokemon[]> {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    const data = await response.json();
    return data.results.map((p: any, index: number) => ({
      id: index + 1,
      name: p.name,
      height: Math.floor(Math.random() * 99),
    }));
  }
}
