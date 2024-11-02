import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Maps() {
  return (
    <View style={styles.container}>
      <Ionicons name="map-outline" size={100} color="#146bfa" />
      <Text style={styles.heading}>Fitur Maps Segera Hadir</Text>
      <Text style={styles.description}>
        Kami sedang bekerja keras dalam membuat fitur maps. Nantikan update
        kami!
      </Text>
      <Image
        source={{
          uri: "https://via.placeholder.com/300x200.png?text=Coming+Soon",
        }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f8f8f8",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#146bfa",
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginTop: 20,
  },
});
