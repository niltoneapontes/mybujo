import styled from 'styled-components/native';
import { lightTheme } from '../../tokens/colors';
import { Dimensions } from 'react-native';

export const ScrollViewWrapper = styled.View`
  height: ${() => `${Dimensions.get('window').height}px`};
  width: 100%;
`;

export const Container = styled.View`
  flex: 1;
  width: 100%;
  padding: 24px;
  justify-content: space-between;
  align-items: center;
  background-color: ${() => lightTheme.PRIMARY_COLOR};
`;

export const TutorialTitle = styled.Text`
  width: 100%;
  font-size: 40px;
  font-family: 'Inter-Black';
  text-align: left;
  margin-top: 40px;
  color: ${() => lightTheme.WHITE};
`;

export const TutorialSubTitle = styled.Text`
  width: 100%;
  font-size: 24px;
  font-family: 'Inter-Black';
  text-align: left;
  margin-bottom: 16px;
  color: ${() => lightTheme.WHITE};
`;

export const TutorialText = styled.Text`
  width: 100%;
  font-size: 16px;
  font-family: 'Inter-Bold';
  text-align: left;
  margin-bottom: 8px;
  color: ${() => lightTheme.WHITE};
`;

export const ButtonContainer = styled.View`
  margin-top: 40px;
  width: 100%;
`;

export const TipsWrapper = styled.View`
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 32px 0;
`;
