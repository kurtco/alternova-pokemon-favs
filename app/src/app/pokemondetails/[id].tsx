import { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { View, StyleSheet, Image } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { PokemonDetail } from "@domain/entities/PokemonDetail";
import { PokemonRepositoryImpl } from "@infrastructure/repositories/PokemonRepositoryImpl";
import { PokemonDetailsScreenLabels } from "@domain/constants/Labels";

export default function PokemonDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const repo = new PokemonRepositoryImpl();
        const details = await repo.getDetails(Number(id));
        setPokemon(details);
      } catch (error) {
        setError(PokemonDetailsScreenLabels.ERROR_LOADING);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.messageContainer}>
        <ActivityIndicator animating={true} size="large" />
        <Text>{PokemonDetailsScreenLabels.LOADING}</Text>
      </View>
    );
  }

  if (!pokemon || error) {
    return (
      <View style={styles.messageContainer}>
        <Text variant="bodyMedium" style={styles.errorText}>
          {error || PokemonDetailsScreenLabels.ERROR_LOADING}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: pokemon.name }} />

      <Text variant="titleLarge">{pokemon.name}</Text>
      <Image
        source={{
          uri: pokemon.sprites.other["official-artwork"].front_default,
        }}
        style={styles.image}
      />
      <Text>
        {PokemonDetailsScreenLabels.HEIGHT} {pokemon.height}
      </Text>
      <Text>
        {PokemonDetailsScreenLabels.WEIGHT} {pokemon.weight}
      </Text>
      <Text>
        {PokemonDetailsScreenLabels.EXPERIENCE} {pokemon.base_experience}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontWeight: "bold",
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 20,
  },
});
