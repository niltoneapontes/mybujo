import styled from 'styled-components/native';

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
        return props.theme.PRIMARY_COLOR;
      case 'cancel':
        return props.theme.GRAY200;
      case 'danger':
        return props.theme.GRAY200;
      default:
        return props.theme.PRIMARY_COLOR;
    }
  }};
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text<Props>`
  color: ${(props: any) => {
    switch (props.type) {
      case 'action':
        return props.theme.WHITE;
      case 'cancel':
        return props.theme.GRAY600;
      case 'danger':
        return props.theme.SECONDARY_COLOR;
      default:
        return props.theme.WHITE;
    }
  }};
  font-size: 16px;
`;
