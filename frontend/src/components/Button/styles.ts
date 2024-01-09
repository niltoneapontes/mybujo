import styled from 'styled-components';

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
        return props.theme.PRIMARY_COLOR;
      case 'cancel':
        return props.theme.GRAY200;
      case 'danger':
        return props.theme.GRAY200;
      case 'edit':
        return props.theme.WHITE;
      default:
        return props.theme.PRIMARY_COLOR;
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
        return props.theme.WHITE;
      case 'cancel':
        return props.theme.GRAY600;
      case 'danger':
        return props.theme.SECONDARY_COLOR;
      case 'edit':
        return props.theme.PRIMARY_COLOR_DARKER;
      default:
        return props.theme.WHITE;
    }
  }};
  font-size: 16px;
`;
