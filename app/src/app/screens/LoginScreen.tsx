import { useState } from "react";
import { TextInput, Button, Text } from "react-native-paper";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "./../../../firebaseConfig";
import { StyleSheet, View } from "react-native";
import { handleFirebaseAuthError } from "@infrastructure/services/errorHandling";
import { LoginScreenLabels } from "@domain/constants/Labels";
import * as Animatable from "react-native-animatable";

const auth = getAuth(firebaseConfig);

const LoginScreen = () => {
  const [email, setEmail] = useState("test@alternova.com");
  const [password, setPassword] = useState("alternova");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      const errorMsg = handleFirebaseAuthError(error);
      setErrorMessage(errorMsg);
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.Text
        animation="fadeInDown"
        duration={1500}
        style={styles.title}
      >
        {LoginScreenLabels.WELCOME}
      </Animatable.Text>
      <TextInput
        label={LoginScreenLabels.EMAIL_INPUT}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        label={LoginScreenLabels.PASSWORD_INPUT}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button
        style={styles.button}
        mode="contained"
        onPress={handleLogin}
        disabled={!email || !password}
      >
        {LoginScreenLabels.LOGIN_BUTTON}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    width: "100%",
  },
  input: {
    width: "100%",
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default LoginScreen;
