import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props: any) => props.theme.GRAY400};
  position: relative;
`;

export const LoginImage = styled.Image`
  width: 100%;
`;

export const ButtonsContainer = styled.View`
  width: 100%;
  padding: 16px;
`;

export const GoogleButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 54px;
  width: 100%;
  background-color: ${(props: any) => props.theme.WHITE};
  border-radius: 10px;
  elevation: 4;
`;

export const GoogleButtonText = styled.Text`
  margin-left: 16px;
`;

export const Disclaimer = styled.Text`
  font-size: 16px;
  color: ${(props: any) => props.theme.TEXT_COLOR};
  text-align: center;
  margin: 16px;
`;
