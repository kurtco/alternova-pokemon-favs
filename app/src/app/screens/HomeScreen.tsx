import { useEffect, useState, useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Appbar, ActivityIndicator, Text, Snackbar } from "react-native-paper";
import { useFavorites } from "@context/useFavorites";
import { Pokemon } from "@domain/entities/Pokemon";
import { PokemonRepositoryImpl } from "@infrastructure/repositories/PokemonRepositoryImpl";
import { HomeScreenLabels } from "@domain/constants/Labels";
import PokemonCard from "../components/PokemonCard";

export default function HomeScreen() {
  const { favorites, nonFavorites, toggleFavorite, setPokemonList } =
    useFavorites();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const repo = new PokemonRepositoryImpl();
        const data = await repo.getAll();
        setPokemonList(data);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage(HomeScreenLabels.ERROR_LOADING);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleToggleFavorite = useCallback(
    (pokemon: Pokemon) => toggleFavorite(pokemon),
    [toggleFavorite]
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
        <Text style={styles.loadingText}>{HomeScreenLabels.LOADING}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title={HomeScreenLabels.APP_BAR_TITLE} />
      </Appbar.Header>
      <Snackbar
        visible={errorMessage !== ""}
        onDismiss={() => setErrorMessage("")}
        duration={3000}
      >
        {errorMessage || HomeScreenLabels.ERROR_LOADING}
      </Snackbar>

      <View style={styles.listContainer}>
        <View style={styles.halfScreen}>
          <Text style={styles.sectionTitle}>
            {HomeScreenLabels.NOT_FAVORITES_TITLE}
          </Text>
          <FlatList
            data={nonFavorites}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <PokemonCard
                pokemon={item}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={false}
              />
            )}
          />
        </View>

        <View style={styles.halfScreen}>
          <Text style={styles.sectionTitle}>
            {HomeScreenLabels.FAVORITES_TITLE}
          </Text>
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <PokemonCard
                pokemon={item}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={true}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },
  header: {
    backgroundColor: "#FFCC00",
  },
  listContainer: {
    flex: 1,
  },
  halfScreen: {
    flex: 0.5,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});
