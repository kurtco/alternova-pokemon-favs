import { Card, IconButton, Text } from "react-native-paper";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Pokemon } from "@domain/entities/Pokemon";
import { PokemonCardLabels } from "@domain/constants/Labels";

interface PokemonCardProps {
  pokemon: Pokemon;
  onToggleFavorite: (pokemon: Pokemon) => void;
  isFavorite: boolean;
  onPress: (id: string) => void;
}

export default function PokemonCard({
  pokemon,
  onToggleFavorite,
  isFavorite,
  onPress,
}: PokemonCardProps) {
  const router = useRouter();
  return (
    <Card
      style={[
        styles.card,
        isFavorite ? styles.favoriteCard : styles.nonFavoriteCard,
      ]}
    >
      <Card.Content style={styles.cardContent}>
        <IconButton
          icon={isFavorite ? "star" : "heart-outline"}
          iconColor={isFavorite ? "gold" : "gray"}
          onPress={() => onToggleFavorite(pokemon)}
        />
        <TouchableOpacity onPress={() => onPress(String(pokemon.id))}>
          <Text style={styles.text}>
            {pokemon.name} - {PokemonCardLabels.CARD_HEIGHT_TITLE}:{" "}
            {pokemon.height}
          </Text>
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    textDecorationLine: "underline",
    color: "#007AFF",
  },
  favoriteCard: {
    backgroundColor: "#FFF8DC",
  },
  nonFavoriteCard: {
    backgroundColor: "#E8EAF6",
  },
});
