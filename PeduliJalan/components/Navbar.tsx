import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";

const Navbar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <FontAwesome5 name="home" size={24} color="#146bfa" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Favorites")}>
        <Ionicons name="star" size={24} color="#146bfa" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Location")}>
        <MaterialIcons name="location-on" size={24} color="#146bfa" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
        <Ionicons name="camera" size={24} color="#146bfa" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
});

export default Navbar;
