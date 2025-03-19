import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BASE_URL } from "../../config";

export default function Index() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true); // Set loading to true when fetching posts initially
    try {
      const response = await fetch(`${BASE_URL}/posts`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  if (loading && !refreshing) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />;
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {posts.map((post, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.userInfo}>
            <Image
              source={
                post.profile_image
                  ? { uri: `data:image/jpeg;base64,${post.profile_image}` }
                  : require("../../assets/images/profil/profil1.jpg") 
              }
              style={styles.avatar}
            />
            <View>
              <Text style={styles.userName}>{post.user_name}</Text>
              <View style={styles.userDetailsContainer}>
                <Ionicons name="time-outline" size={14} color="#777" />
                <Text style={styles.userDetails}> {post.time_ago} · </Text>
                <Ionicons name="location-outline" size={14} color="#146bfa" />
                <Text style={styles.location}> {post.location}</Text>
              </View>
            </View>
            <View style={styles.moreOptions}>
              <Text>•••</Text>
            </View>
          </View>
          <Image
            source={{ uri: `data:image/jpeg;base64,${post.post_image}` }}
            style={styles.postImage}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    height: 500,
  },
});
