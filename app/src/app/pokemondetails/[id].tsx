import { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { View, StyleSheet, Image, Text, ActivityIndicator } from "react-native";
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
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.text}>{PokemonDetailsScreenLabels.LOADING}</Text>
      </View>
    );
  }

  if (!pokemon || error) {
    return (
      <View style={styles.messageContainer}>
        <Text style={[styles.text, styles.errorText]}>
          {error || PokemonDetailsScreenLabels.ERROR_LOADING}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: pokemon.name }} />

      <Text style={styles.title}>{pokemon.name}</Text>
      <Image
        source={{
          uri: pokemon.sprites.other["official-artwork"].front_default,
        }}
        style={styles.image}
      />
      <Text style={styles.text}>
        {PokemonDetailsScreenLabels.HEIGHT} {pokemon.height}
      </Text>
      <Text style={styles.text}>
        {PokemonDetailsScreenLabels.WEIGHT} {pokemon.weight}
      </Text>
      <Text style={styles.text}>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: "center",
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
