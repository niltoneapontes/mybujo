import React, { useEffect } from 'react';
import { CopyPasteContainer, CopyPasteContainerText } from './styles';
import { TouchableOpacity, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import { darkTheme, lightTheme } from '../../tokens/colors';
import { useIsFocused } from '@react-navigation/native';

interface CopyPasteButtonProps {
  contentRef: React.MutableRefObject<string>;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  clearMessage: () => void;
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CopyPasteButton({
  contentRef,
  setMessage,
  clearMessage,
  setRefreshing,
}: CopyPasteButtonProps) {
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;
  const isFocused = useIsFocused();

  useEffect(() => {
    setMessage(null);
    clearMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <CopyPasteContainer>
      <TouchableOpacity
        onPress={() => {
          Clipboard.setString(contentRef.current);
          setMessage('Você copiou todo o conteúdo');
          clearMessage();
        }}
        style={{ alignItems: 'center' }}>
        <Icon name="content-copy" size={24} color={theme.SOFT_WHITE} />
        <CopyPasteContainerText>Copiar tudo</CopyPasteContainerText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          setRefreshing(true);
          try {
            const text = await Clipboard.getString();
            contentRef.current = text;
            setMessage('Você inseriu todo o conteúdo');
            clearMessage();
          } finally {
            setRefreshing(false);
          }
        }}
        style={{ marginLeft: 8, alignItems: 'center' }}>
        <Icon name="content-paste" size={24} color={theme.SOFT_WHITE} />
        <CopyPasteContainerText>Colar tudo</CopyPasteContainerText>
      </TouchableOpacity>
    </CopyPasteContainer>
  );
}
