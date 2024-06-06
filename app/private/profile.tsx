import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Avatar, Text, Divider, List } from "react-native-paper";
import { useAuth } from "@/context/AuthenticationContext";

export default function ProfileScreen() {
  const {
    session: { username, image },
    logout,
  } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Avatar.Image source={{ uri: image }} size={80} />
        <Text style={styles.username}>Welcome, {username}</Text>
        <Text>Here you can manage your</Text>
        <Text>account details & settings.</Text>
      </View>
      <Divider />
      <View style={styles.content}>
        <List.Section>
          <List.Subheader>Settings</List.Subheader>
          <Divider />
          <List.Item
            title="View my profile info"
            onPress={() => console.log("View Profile Info")}
          />
          <Divider />
          <List.Item
            title="Logout"
            onPress={handleLogout}
            titleStyle={{ color: "red" }}
          />
          <Divider />
        </List.Section>
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
    marginTop: 20,
  },
});
