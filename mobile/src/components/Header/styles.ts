import styled from 'styled-components/native';

export const Container = styled.View`
  height: 108px;
  width: 100%;
`;

export const HeaderContainer = styled.ScrollView`
  width: 100%;
  background-color: ${(props: any) => props.theme.BACKGROUND_COLOR};
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
    props.isSelected ? props.theme.PRIMARY_COLOR : props.theme.GRAY400};
`;

export const DateText = styled.Text`
  font-size: 24px;
  font-family: 'Inter-Regular';
  color: ${(props: any) =>
    props.isSelected ? props.theme.WHITE : props.theme.DARK_TEXT_COLOR};
`;
