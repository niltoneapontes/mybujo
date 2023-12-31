import styled from 'styled-components/native';

export const Container = styled.View`
  height: 124px;
  width: 100%;
  background-color: ${(props: any) => props.theme.TAB_BAR};
  elevation: 4;
`;

export const HeaderContainer = styled.ScrollView`
  width: 100%;
  padding: 4px 6px;
`;

export const DateComponent = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 36px;
  margin: 0 6px;
  background-color: ${(props: any) =>
    props.isSelected ? props.theme.PRIMARY_COLOR : props.theme.GRAY400};
`;

export const DateText = styled.Text`
  font-size: 24px;
  font-family: 'Inter-Regular';
  color: ${(props: any) =>
    props.isSelected ? props.theme.WHITE : props.theme.DARK_TEXT_COLOR};
`;

export const SubtitleButton = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${(props: any) => props.theme.PRIMARY_COLOR};
  align-self: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 8px;
  margin-top: 8px;
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  font-family: 'Inter-SemiBold';
  color: ${(props: any) => props.theme.WHITE};
  margin-right: 4px;
`;
