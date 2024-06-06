import React from "react";
import { StyleSheet, ScrollView, Image, View } from "react-native";
import { Avatar, Text, Card, Button } from "react-native-paper";
import { useAuth } from "@/context/AuthenticationContext";
import { router } from "expo-router";

export default function TabOneScreen() {
  const {
    session: { username, image },
  } = useAuth();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Avatar.Image source={{ uri: image }} size={80} />
        <Text style={styles.username}>Welcome, {username}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.card}>
          <Card.Cover
            source={{ uri: "https://picsum.photos/800/350" }}
            style={styles.cardImage}
          />
          <View style={{ marginVertical: 12 }}>
            <Text variant="titleLarge">Premium accessories</Text>
            <Text variant="bodyMedium">
              Amazing products for your car awaits,
            </Text>
            <Text>get your latest flashy tech today!</Text>
          </View>
          <Card.Actions>
            <Button
              onPress={() => {
                router.replace("private/product");
              }}
            >
              View all products now!
            </Button>
          </Card.Actions>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    height: "40%",
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  content: {
    flex: 1,
  },
  card: {
    marginBottom: 20,
    borderRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 12,
    textAlign: "center",
  },
  cardImage: {
    height: 200,
  },
});
