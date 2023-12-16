import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  padding: 24px;
  background-color: ${(props: any) => props.theme.PRIMARY_COLOR_DARKER};
`;

export const TutorialTitle = styled.Text`
  width: 100%;
  font-size: 40px;
  font-family: 'Inter-Black';
  text-align: left;
  margin-bottom: 40px;
  margin-top: 64px;
  color: ${props => props.theme.WHITE};
`;

export const TutorialSubTitle = styled.Text`
  width: 100%;
  font-size: 24px;
  font-family: 'Inter-Black';
  text-align: left;
  margin-bottom: 16px;
  color: ${props => props.theme.WHITE};
`;

export const TutorialText = styled.Text`
  width: 100%;
  font-size: 16px;
  font-family: 'Inter-Bold';
  text-align: left;
  margin-bottom: 8px;
  color: ${props => props.theme.WHITE};
`;

export const ButtonContainer = styled.View`
  width: 100%;
  position: absolute;
  bottom: 32px;
`;
