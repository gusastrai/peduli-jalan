import React from "react";
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.userInfo}>
          <Image
            source={require("../../assets/images/profil/profil1.jpg")}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.userName}>Irfan Dwi Samudra</Text>
            <View style={styles.userDetailsContainer}>
              <Ionicons name="time-outline" size={14} color="#777" />
              <Text style={styles.userDetails}> 3 hari · </Text>
              <Ionicons name="location-outline" size={14} color="#146bfa" />
              <Text style={styles.location}> Kamal, Bangkalan</Text>
            </View>
          </View>
          <View style={styles.moreOptions}>
            <Text>•••</Text>
          </View>
        </View>
        <Image
          source={require("../../assets/images/jalan/jalan1.jpg")}
          style={styles.postImage}
        />
      </View>

      <View style={styles.card}>
        <View style={styles.userInfo}>
          <Image
            source={require("../../assets/images/profil/profil2.jpg")}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.userName}>Bagus Satria</Text>
            <View style={styles.userDetailsContainer}>
              <Ionicons name="time-outline" size={14} color="#777" />
              <Text style={styles.userDetails}> 1 hari · </Text>
              <Ionicons name="location-outline" size={14} color="#146bfa" />
              <Text style={styles.location}> Benjeng, Gresik</Text>
            </View>
          </View>
          <View style={styles.moreOptions}>
            <Text>•••</Text>
          </View>
        </View>
        <Image
          source={require("../../assets/images/jalan/jalan2.jpg")}
          style={styles.postImage}
        />
      </View>

      <View style={styles.card}>
        <View style={styles.userInfo}>
          <Image
            source={require("../../assets/images/profil/profil3.jpg")}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.userName}>Sabil Ahmad Hidayat</Text>
            <View style={styles.userDetailsContainer}>
              <Ionicons name="time-outline" size={14} color="#777" />
              <Text style={styles.userDetails}> 2 hari · </Text>
              <Ionicons name="location-outline" size={14} color="#146bfa" />
              <Text style={styles.location}> Kamal, Bangkalan</Text>
            </View>
          </View>
          <View style={styles.moreOptions}>
            <Text>•••</Text>
          </View>
        </View>
        <Image
          source={require("../../assets/images/jalan/jalan3.jpg")}
          style={styles.postImage}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 12,
    marginLeft: 20,
  },
  card: {
    marginTop: 20,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  userDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  userDetails: {
    fontSize: 12,
    color: "#777",
  },
  location: {
    fontSize: 12,
    color: "#146bfa",
  },
  moreOptions: {
    marginLeft: "auto",
  },
  postImage: {
    width: "100%",
    height: 350,
  },
});
