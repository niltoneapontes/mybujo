import styled from 'styled-components/native';
import { lightTheme } from '../../tokens/colors';

interface Props {
  type: 'action' | 'cancel' | 'danger';
}

export const ButtonContainer = styled.TouchableOpacity<Props>`
  width: 100%;
  height: 48px;
  border-radius: 10px;
  padding: 8px 12px;
  background-color: ${(props: any) => {
    switch (props.type) {
      case 'action':
        return lightTheme.PRIMARY_COLOR;
      case 'cancel':
        return lightTheme.GRAY200;
      case 'danger':
        return lightTheme.GRAY200;
      default:
        return lightTheme.PRIMARY_COLOR;
    }
  }};
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text<Props>`
  font-family: 'Inter-Bold';
  color: ${(props: any) => {
    switch (props.type) {
      case 'action':
        return lightTheme.WHITE;
      case 'cancel':
        return lightTheme.GRAY600;
      case 'danger':
        return lightTheme.SECONDARY_COLOR;
      default:
        return lightTheme.WHITE;
    }
  }};
  font-size: 14px;
`;
