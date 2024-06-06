import React from "react";
import {
  StyleSheet,
  FlatList,
  Button,
  View,
  ScrollView,
  Animated,
} from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Divider,
  Text,
  ActivityIndicator,
} from "react-native-paper";
import { useProducts } from "@/context/ProductContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProductScreen() {
  const { products, loading, error, page, totalPages, nextPage, prevPage } =
    useProducts();
  const insets = useSafeAreaInsets();

  const renderLoadingPlaceholder = () => {
    return (
      <View style={styles.loadingCard}>
        <View style={[styles.imagePlaceholder, styles.loadPlaceholder]} />
        <View style={styles.textPlaceholder}>
          <View style={[styles.titlePlaceholder, styles.loadPlaceholder]} />
          <View
            style={[styles.descriptionPlaceholder, styles.loadPlaceholder]}
          />
        </View>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            bottom: 112,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" style={{ opacity: 0.5 }} />
        </View>
      </View>
    );
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.loadingCard}>
      <Card.Cover source={{ uri: item.thumbnail }} />
      <Card.Content style={{ marginTop: 8, marginBottom: 18 }}>
        <Title>{item.title}</Title>
        <Paragraph>{item.description}</Paragraph>
      </Card.Content>
      <Divider />
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Title style={{ marginTop: 22 }}>Volkswagen Products</Title>
      <Divider style={{ marginTop: 12, marginBottom: 22 }} />
      {loading ? (
        <ScrollView>
          {Array.from(Array(12).keys()).map((index) => (
            <View key={index}>{renderLoadingPlaceholder()}</View>
          ))}
        </ScrollView>
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
        />
      )}
      <View style={styles.pagination}>
        <Button
          title="Prev"
          onPress={prevPage}
          disabled={loading || page === 1}
        />
        <Text>{`Page ${page} of ${totalPages}`}</Text>
        <Button
          title="Next"
          onPress={nextPage}
          disabled={loading || page === totalPages}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadPlaceholder: {
    backgroundColor: "#DADADA",
    borderRadius: 8,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 4,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 20,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  loadingCard: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    overflow: "hidden",
  },
  imagePlaceholder: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  textPlaceholder: {
    padding: 12,
  },
  titlePlaceholder: {
    width: "70%",
    height: 16,
    marginBottom: 8,
  },
  descriptionPlaceholder: {
    width: "100%",
    height: 112,
  },
});
