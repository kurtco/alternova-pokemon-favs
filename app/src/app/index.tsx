import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import HomeScreen from "./screens/HomeScreen";
import { useFavorites } from "@context/useFavorites";
import LoginScreen from "./screens/LoginScreen";
import firebaseConfig from "./../../firebaseConfig";

const auth = getAuth(firebaseConfig);

export default function Index() {
  const [user, setUser] = useState<User | null>(null);
  const { favorites } = useFavorites();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  if (user === null) {
    return <LoginScreen />;
  }

  return <HomeScreen />;
}
