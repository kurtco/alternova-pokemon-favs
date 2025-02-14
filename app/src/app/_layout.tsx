import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FavoritesProvider } from "@context/useFavorites";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <ThemeProvider value={DefaultTheme}>
        <Stack
          screenOptions={{
            headerBackTitle: "Back",
            headerBackTitleStyle: { fontSize: 16 },
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </FavoritesProvider>
  );
}
