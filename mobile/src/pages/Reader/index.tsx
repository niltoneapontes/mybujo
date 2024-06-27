import React, { useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { darkTheme } from '../../tokens/colors';

function Reader() {
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  // @ts-ignore
  const device = devices.back || null;

  useEffect(() => {
    async function getPermission() {
      if ((await Camera.requestCameraPermission()) === 'denied') {
        console.error("User didn't give Camera permission");
        return <Text>Permissão necessária</Text>;
      }
    }

    getPermission();
  }, []);

  const takePhoto = async () => {
    if (camera.current) {
      const photo = await camera.current.takePhoto();
      console.log(photo.path);
    }
  };

  if (device === null) {
    return <Text>Nenhum dispositivo de câmera encontrado :/</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        ref={camera}
        device={device}
        isActive={true}
        photo={true}
      />
      <TouchableOpacity onPress={takePhoto} style={styles.button} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 50,
    width: 50,
    height: 50,
    left: '50%',
    transform: [{ translateX: -50 }],
    padding: 10,
    backgroundColor: darkTheme.PRIMARY_COLOR,
    borderRadius: 25,
  },
});

export default Reader;
