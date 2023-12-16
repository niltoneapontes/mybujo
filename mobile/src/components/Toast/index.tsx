import React from 'react';
import { Container, ToastText, Wrapper } from './styles';
import Icon from 'react-native-vector-icons/Feather';
import { lightTheme } from '../../tokens/colors';
import { MotiView } from 'moti';

interface ToastProps {
  text: string;
  type?: 'success' | 'error';
}

function Toast({ text }: ToastProps) {
  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{
        opacity: [
          { value: 1, delay: 0 },
          { value: 0, delay: 3000 },
        ],
      }}
      exit={{ opacity: 0 }}
      transition={{
        type: 'timing',
        duration: 350,
      }}>
      <Container>
        <Wrapper>
          <Icon name="info" size={24} color={lightTheme.WHITE} />
          <ToastText multiline>{text}</ToastText>
        </Wrapper>
      </Container>
    </MotiView>
  );
}

export default Toast;
