import React from 'react';
import { ButtonContainer, ButtonText } from './styles';

interface ButtonProps {
  type: 'action' | 'cancel' | 'danger';
  text: string;
  onPress: (params: any) => void;
}

function Button({ type, text, onPress }: ButtonProps) {
  return (
    <ButtonContainer onPress={onPress} type={type}>
      <ButtonText type={type}>{text}</ButtonText>
    </ButtonContainer>
  );
}

export default Button;
