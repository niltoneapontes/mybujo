import styled from 'styled-components/native';

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding-top: 8px;
  align-items: center;
  background-color: 'rgba(0,0,0,0.5)';
`;

export const DatePickerItem = styled.TouchableOpacity`
  background-color: ${(props: any) => props.theme.PRIMARY_COLOR_DARKER};
  width: 100%;
  padding: 8px;
`;

export const DatePickerItemText = styled.Text`
  color: ${(props: any) => props.theme.WHITE};
  font-family: 'Inter-Bold';
  font-size: 16px;
`;
