import React, { useEffect } from 'react';
import { CopyPasteContainer, CopyPasteContainerText } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { lightTheme } from '../../tokens/colors';


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
  const theme = lightTheme;

  useEffect(() => {
    setMessage(null);
    clearMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CopyPasteContainer>
      <button
        onClick={( ) => {
          navigator.clipboard.writeText(contentRef.current);
          setMessage('Você copiou todo o conteúdo');
          clearMessage();
        }}
        style={{ alignItems: 'center' }}>
        <Icon name="content-copy" size={24} color={theme.SOFT_WHITE} />
        <CopyPasteContainerText>Copiar tudo</CopyPasteContainerText>
      </button>
      <button
        onClick={async () => {
          setRefreshing(true);
          try {
            const text = await navigator.clipboard.readText();
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
      </button>
    </CopyPasteContainer>
  );
}
