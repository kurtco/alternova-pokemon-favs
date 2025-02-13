import { Pokemon } from "../entities/Pokemon";

export interface PokemonRepository {
  getAll(): Promise<Pokemon[]>;
}
