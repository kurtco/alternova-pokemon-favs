import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { useFavorites } from "@context/useFavorites";
import { Pokemon } from "@domain/entities/Pokemon";
import { PokemonRepositoryImpl } from "@infrastructure/repositories/PokemonRepositoryImpl";
import { sortElements } from "utils";

export default function HomeScreen() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchData = async () => {
      const repo = new PokemonRepositoryImpl();
      const data = await repo.getAll();
      setPokemonList(data);
    };
    fetchData();
  }, []);

  const nonFavorites = pokemonList.filter(
    (p) => !favorites.some((f) => f.id === p.id)
  );

  const sortedNonFavorites = sortElements(nonFavorites);
  const sortedFavorites = sortElements(favorites);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="titleLarge" style={styles.header}>
        No Favoritos
      </Text>
      <Card style={styles.card}>
        {sortedNonFavorites.map((pokemon) => (
          <Button key={pokemon.id} onPress={() => toggleFavorite(pokemon)}>
            {pokemon.name} - {pokemon.height}
          </Button>
        ))}
      </Card>

      <Text variant="titleLarge" style={styles.header}>
        Favoritos
      </Text>
      <Card style={styles.card}>
        {sortedFavorites.map((pokemon) => (
          <Button key={pokemon.id} onPress={() => toggleFavorite(pokemon)}>
            {pokemon.name} - {pokemon.height}
          </Button>
        ))}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    marginVertical: 10,
  },
  card: {
    width: "90%",
    padding: 10,
  },
});
