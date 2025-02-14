import { PokemonDetail } from "@domain/entities/PokemonDetail";
import { Pokemon } from "../entities/Pokemon";

export interface PokemonRepository {
  getAll(): Promise<Pokemon[]>;
  getDetails(id: number): Promise<PokemonDetail>;
}
