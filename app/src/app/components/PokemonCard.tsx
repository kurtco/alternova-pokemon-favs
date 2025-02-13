import { Card, IconButton, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Pokemon } from "@domain/entities/Pokemon";
import { PokemonCardLabels } from "@domain/constants/Labels";

interface PokemonCardProps {
  pokemon: Pokemon;
  onToggleFavorite: (pokemon: Pokemon) => void;
  isFavorite: boolean;
}

export default function PokemonCard({
  pokemon,
  onToggleFavorite,
  isFavorite,
}: PokemonCardProps) {
  return (
    <Card
      style={[
        styles.card,
        isFavorite ? styles.favoriteCard : styles.nonFavoriteCard,
      ]}
    >
      <Card.Content style={styles.cardContent}>
        <IconButton
          icon={"star"}
          iconColor={isFavorite ? "gold" : "gray"}
          onPress={() => onToggleFavorite(pokemon)}
        />
        <Text style={styles.text}>
          {pokemon.name} - {PokemonCardLabels.CARD_HEIGHT_TITLE}:{" "}
          {pokemon.height}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 10,
    margin: 5,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
  },
  favoriteCard: {
    backgroundColor: "#FFF8DC",
  },
  nonFavoriteCard: {
    backgroundColor: "#E8EAF6",
  },
});
