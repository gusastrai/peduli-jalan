import React, { useState, useRef } from "react";
import { Camera, CameraType } from "expo-camera/legacy";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  Modal,
  Dimensions,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { BASE_URL } from "../../config";

const { height } = Dimensions.get("window");
const CAMERA_HEIGHT = (height * 3) / 4;
const BUTTONS_HEIGHT = height / 4;

export default function Upload() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [imageUri, setImageUri] = useState(null);
  const [predictionImage, setPredictionImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const cameraRef = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const captureImage = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImageUri(photo.uri);
      setShowCamera(false);
    }
  };

  const pickImageFromGallery = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "You need to allow permission to access the media library."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!imageUri) {
      Alert.alert("Please select or capture an image first");
      return;
    }

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;

    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      type: "image/jpeg",
      name: "photo.jpeg",
    });
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    try {
      const response = await fetch(`${BASE_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const json = await response.json();
      console.log(json.predictions);

      if (json.image) {
        setPredictionImage(json.image);
        setPrediction(json.predictions);
      } else if (json.error) {
        Alert.alert("Error", json.error);
      }
    } catch (error) {
      console.error("Upload Error:", error);
      Alert.alert("Upload failed!", error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => setShowCamera(true)}
          style={styles.optionButton}
        >
          <Ionicons name="camera-outline" size={50} color="black" />
          <Text style={styles.buttonLabel}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={pickImageFromGallery}
          style={styles.optionButton}
        >
          <Ionicons name="file-tray-outline" size={50} color="black" />
          <Text style={styles.buttonLabel}>Upload File</Text>
        </TouchableOpacity>
      </View>

      {imageUri && (
        <>
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          <TouchableOpacity onPress={uploadImage} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </>
      )}

      {prediction && (
        <View style={styles.resultContainer}>
          <Image
            source={{ uri: `data:image/jpeg;base64,${predictionImage}` }}
            style={styles.imagePreview}
          />
          {prediction.map((item, index) => (
            <Text key={index} style={styles.predictionText}>
              {item.class_name} - Confidence:{" "}
              {(item.confidence * 100).toFixed(2)}%
            </Text>
          ))}
        </View>
      )}

      {showCamera && (
        <Modal visible={showCamera} transparent={false} animationType="slide">
          <View style={styles.cameraContainer}>
            <Camera
              style={styles.camera}
              type={type}
              ref={cameraRef}
              ratio="3:4"
            >
              <View style={styles.cameraOverlay}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowCamera(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.flipButton}
                  onPress={() =>
                    setType(
                      type === CameraType.back
                        ? CameraType.front
                        : CameraType.back
                    )
                  }
                >
                  <Text style={styles.flipButtonText}>Flip</Text>
                </TouchableOpacity>
              </View>
            </Camera>
            <View style={styles.captureButtonContainer}>
              <TouchableOpacity
                style={styles.captureButton}
                onPress={captureImage}
              >
                <View style={styles.innerCaptureButton} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  optionButton: {
    backgroundColor: "#dbe9ff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    width: 150,
    height: 150,
    marginVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  imagePreview: {
    width: "100%",
    height: 400,
    marginVertical: 10,
    borderRadius: 10,
  },
  resultContainer: {
    marginTop: 15,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  predictionText: {
    fontSize: 16,
    marginBottom: 5,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  camera: {
    width: "100%",
    height: CAMERA_HEIGHT,
  },
  cameraOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: CAMERA_HEIGHT,
    justifyContent: "space-between",
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
  },
  flipButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 10,
  },
  flipButtonText: {
    color: "white",
    fontSize: 18,
  },
  captureButtonContainer: {
    height: BUTTONS_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  captureButton: {
    backgroundColor: "white",
    borderRadius: 50,
    height: 80,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCaptureButton: {
    backgroundColor: "#146bfa",
    borderRadius: 25,
    height: 50,
    width: 50,
  },
  submitButton: {
    backgroundColor: "#146bfa",
    padding: 10,
    borderRadius: 8,
    marginVertical: 15,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
