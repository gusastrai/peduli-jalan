import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { BASE_URL } from "../../config";

const MapComponent = () => {
  const [damageLocations, setDamageLocations] = useState([]);
  
  useEffect(() => {
    fetchDamageLocations();
  }, []);

  const fetchDamageLocations = async () => {
    try {
      const response = await fetch(`${BASE_URL}/get_damage_locations`);
      const data = await response.json();
      setDamageLocations(data);
    } catch (error) {
      console.error("Failed to fetch damage locations", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: -2.548926,  
          longitude: 118.0148634,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >
        {damageLocations.map((location, index) => (
          // console.log(location),
          <Marker
            key={index}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.tipe_kerusakan}
            description={`Confidence: ${location.confidence}`}
          />
        ))}
      </MapView>
    </View>
  );
};

export default MapComponent;
