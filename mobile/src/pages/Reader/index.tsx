import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import TextRecognition from 'react-native-text-recognition';
import { darkTheme } from '../../tokens/colors';
import Clipboard from '@react-native-clipboard/clipboard';

function Reader() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  // @ts-ignore
  const device = devices.back || null;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const copyToClipboard = (textToCopy: string) => {
    if (textToCopy.length > 0) {
      Clipboard.setString(textToCopy);
    }
  };

  useEffect(() => {
    async function getPermission() {
      if ((await Camera.requestCameraPermission()) === 'denied') {
        console.error("User didn't give Camera permission");
        return <Text>Permissão necessária</Text>;
      }
    }

    getPermission();
  }, []);

  useEffect(() => {
    copyToClipboard(text);
    setLoading(false);
  }, [copyToClipboard, text]);

  const takePhoto = async () => {
    setLoading(true);
    if (camera.current) {
      const photo = await camera.current.takePhoto();
      const result = await TextRecognition.recognize(photo.path);
      setText(result.toString());
      console.info('ML Reading...', result);
    }
  };

  if (device === null) {
    return <Text>Nenhum dispositivo de câmera encontrado :/</Text>;
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Camera
          style={StyleSheet.absoluteFill}
          ref={camera}
          device={device}
          isActive={true}
          photo={true}
        />
        <TouchableOpacity onPress={takePhoto} style={styles.button}>
          {loading && (
            <ActivityIndicator size="large" color={darkTheme.WHITE} />
          )}
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    borderWidth: 10,
    borderColor: darkTheme.WHITE,
    width: 100,
    height: 100,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: darkTheme.SECONDARY_COLOR,
    borderRadius: 50,
    opacity: 0.7,
  },
});

export default Reader;
