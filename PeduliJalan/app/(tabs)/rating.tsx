import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Rating() {
  return (
    <View style={styles.container}>
      <Ionicons name="star-outline" size={100} color="#146bfa" />
      <Text style={styles.heading}>Fitur Rating Segera Hadir</Text>
      <Text style={styles.description}>
        Kami sedang bekerja keras dalam membuat fitur rating. Nantikan update
        kami!
      </Text>
      <Image
        source={{ uri: 'https://via.placeholder.com/300x200.png?text=Coming+Soon' }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f8f8f8',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#146bfa',
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
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
