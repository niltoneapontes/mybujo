import React from 'react';
import { ButtonContainer, ButtonText } from './styles';
import { lightTheme } from '../../tokens/colors';

interface ButtonProps {
  type: 'action' | 'cancel' | 'danger' | 'edit';
  text: string;
  onClick: (params: any) => void;
  hasIcon?: boolean;
  iconName?: string;
}

function Button({
  type,
  text,
  onClick,
  hasIcon = false,
  iconName,
}: ButtonProps) {
  const theme = lightTheme;

  const getIconColor = () => {
    switch (type) {
      case 'action':
        return theme.WHITE;
      case 'cancel':
        return theme.GRAY600;
      case 'danger':
        return theme.SECONDARY_COLOR;
      case 'edit':
        return theme.PRIMARY_COLOR_DARKER;
      default:
        return theme.WHITE;
    }
  };

  return (
    <ButtonContainer onClick={onClick} type={type}>
      <ButtonText type={type}>{text}</ButtonText>
    </ButtonContainer>
  );
}

export default Button;
