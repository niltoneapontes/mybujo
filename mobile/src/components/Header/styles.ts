import styled from 'styled-components/native';
import { lightTheme } from '../../tokens/colors';

export const Container = styled.View`
  height: 108px;
  width: 100%;
`;

export const HeaderContainer = styled.ScrollView`
  width: 100%;
  background-color: ${() => lightTheme.BACKGROUND_COLOR};
  padding: 12px 6px;
  elevation: 4;
`;

export const DateComponent = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 36px;
  margin: 0 6px;
  background-color: ${(props: any) =>
    props.isSelected ? lightTheme.PRIMARY_COLOR : lightTheme.GRAY400};
`;

export const DateText = styled.Text`
  font-size: 24px;
  font-family: 'Inter-Regular';
  color: ${(props: any) =>
    props.isSelected ? lightTheme.WHITE : lightTheme.DARK_TEXT_COLOR};
`;
