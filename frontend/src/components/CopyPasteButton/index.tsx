import React, { useEffect } from 'react';
import { CopyPasteContainer, CopyPasteContainerText, CopyPasteButtonElement } from './styles';
import {FaCopy, FaPaste} from 'react-icons/fa';
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
      <CopyPasteButtonElement
        onClick={() => {
          navigator.clipboard.writeText(contentRef.current);
          setMessage('Você copiou todo o conteúdo');
          clearMessage();
        }}>
        <FaCopy size={24} color={theme.SOFT_WHITE} />
        <CopyPasteContainerText>Copiar tudo</CopyPasteContainerText>
      </CopyPasteButtonElement>
      <CopyPasteButtonElement
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
        >
        <FaPaste size={24} color={theme.SOFT_WHITE} />
        <CopyPasteContainerText>Colar tudo</CopyPasteContainerText>
      </CopyPasteButtonElement>
    </CopyPasteContainer>
  );
}
