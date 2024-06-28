import styled from 'styled-components/native';
import { lightTheme } from '../../tokens/colors';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  padding: 24px;
  justify-content: space-between;
  align-items: stretch;
  background-color: ${() => lightTheme.PRIMARY_COLOR};
`;

export const TutorialTitle = styled.Text`
  width: 100%;
  font-size: 40px;
  font-family: 'Inter-Black';
  text-align: left;
  margin-top: 24px;
  color: ${() => lightTheme.WHITE};
`;

export const TutorialSubTitle = styled.Text`
  width: 100%;
  font-size: 24px;
  font-family: 'Inter-Black';
  text-align: left;
  margin-top: 0;
  margin-bottom: 16px;
  color: ${() => lightTheme.GRAY600};
`;

export const TutorialText = styled.Text`
  width: 100%;
  font-size: 16px;
  font-family: 'Inter-Bold';
  text-align: left;
  margin-bottom: 8px;
  color: ${() => lightTheme.GRAY600};
`;

export const ButtonContainer = styled.View`
  margin-top: 24px;
  width: 100%;
  align-self: flex-end;
`;

export const TipsWrapper = styled.ScrollView`
  width: 100%;
  border-radius: 12px;
  max-height: 400px;
  background-color: ${(props: any) => props.theme.WHITE};
`;
