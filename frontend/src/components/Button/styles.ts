import styled from 'styled-components';
import { lightTheme } from '../../tokens/colors';

interface Props {
  type: 'action' | 'cancel' | 'danger';
}

export const ButtonContainer = styled.button<Props>`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  flex-direction: row;
  padding: 8px 12px;
  background-color: ${(props: any) => {
    switch (props.type) {
      case 'action':
        return lightTheme.PRIMARY_COLOR;
      case 'cancel':
        return lightTheme.GRAY200;
      case 'danger':
        return lightTheme.GRAY200;
      case 'edit':
        return lightTheme.WHITE;
      default:
        return lightTheme.PRIMARY_COLOR;
    }
  }};
  align-items: center;
  justify-content: ${(props: any) => (props.hasIcon ? 'flex-start' : 'center')};
`;

export const ButtonText = styled.p<Props>`
  font-family: 'Inter-Bold';
  color: ${(props: any) => {
    switch (props.type) {
      case 'action':
        return lightTheme.WHITE;
      case 'cancel':
        return lightTheme.GRAY600;
      case 'danger':
        return lightTheme.SECONDARY_COLOR;
      case 'edit':
        return lightTheme.PRIMARY_COLOR_DARKER;
      default:
        return lightTheme.WHITE;
    }
  }};
  font-size: 16px;
`;
