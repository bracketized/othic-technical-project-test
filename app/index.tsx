// app/login.tsx
import { useAuth } from "@/context/AuthenticationContext";
import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  Title,
  Subheading,
  Snackbar,
} from "react-native-paper";

export default function Login() {
  const { login, error } = useAuth();
  const [username, setUsername] = useState<string>("emilys");
  const [password, setPassword] = useState<string>("emilyspass");

  const handleLogin = async () => {
    await login(username, password);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
      }}
    >
      <Image
        source={require("@assets/logos/vw.png")}
        style={{ height: 200, width: "100%" }}
        resizeMode="contain"
      />
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 22,
        }}
      >
        <Title>Volkswagen APP</Title>
        <Subheading>Please login to continue</Subheading>
      </View>
      <View style={LoginStyles.loginWrapper}>
        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          style={{ marginTop: 20 }}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{ marginTop: 10 }}
        />
        <Button
          mode="contained"
          onPress={handleLogin}
          style={{ marginTop: 20 }}
        >
          Login
        </Button>
      </View>
    </View>
  );
}

const LoginStyles = StyleSheet.create({
  loginWrapper: {
    padding: 12,
    borderRadius: 12,
  },
});
