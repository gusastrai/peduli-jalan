import React from 'react';
import { StatusBar } from 'react-native';
import { Tabs } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        translucent={false} 
      />
      
      <Tabs
        screenOptions={({ route }) => ({
          header: () => (
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Peduli Jalan</Text>
              <View style={styles.headerIcons}>
                <TouchableOpacity onPress={() => alert('Search clicked')}>
                  <Ionicons
                    name="search"
                    size={24}
                    color="black"
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert('Menu clicked')}>
                  <Ionicons
                    name="menu"
                    size={24}
                    color="black"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ),
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'index':
                iconName = 'home';
                break;
              case 'rating':
                iconName = 'star';
                break;
              case 'maps':
                iconName = 'map';
                break;
              case 'upload':
                iconName = 'cloud-upload';
                break;
              default:
                iconName = 'circle';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#146bfa',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#fff',
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
            marginTop: 5,
          },
        })}
      >
        <Tabs.Screen name="index" options={{ title: 'Home' }} />
        <Tabs.Screen name="rating" options={{ title: 'Rating' }} />
        <Tabs.Screen name="maps" options={{ title: 'Maps' }} />
        <Tabs.Screen name="upload" options={{ title: 'Upload' }} />
      </Tabs>
    </>
  );
}

const styles = {
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#146bfa',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 12,
    backgroundColor: '#ccc',
    padding: 6,
    borderRadius: 100,
  },
};
