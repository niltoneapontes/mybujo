import styled from 'styled-components/native';
import { lightTheme } from '../../tokens/colors';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  background-color: ${() => lightTheme.GRAY400};
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
  background-color: ${() => lightTheme.WHITE};
  border-radius: 10px;
  elevation: 4;
  margin-bottom: 12px;
`;

export const GoogleButtonText = styled.Text`
  font-size: 14px;
  font-family: 'Inter-Bold';
  margin-left: 16px;
  color: ${() => lightTheme.DARK_TEXT_COLOR};
`;

export const Disclaimer = styled.Text`
  font-size: 12px;
  font-family: 'Inter-Regular';
  color: ${() => lightTheme.TEXT_COLOR};
  text-align: center;
  margin: 16px;
`;

export const DisclaimerLink = styled.Text`
  font-size: 12px;
  font-family: 'Inter-Regular';
  text-decoration: underline;
  color: ${() => lightTheme.PRIMARY_COLOR};
  text-align: center;
  margin: 16px;
`;

export const FacebookButton = styled.TouchableOpacity`
  padding: 12px;
  background-color: ${() => lightTheme.FACEBOOK};
  border-radius: 8px;
  height: 54px;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const FacebookButtonText = styled.Text`
  color: ${() => lightTheme.WHITE};
  padding-left: 16px;
  font-size: 14px;
  font-family: 'Inter-Bold';
`;
