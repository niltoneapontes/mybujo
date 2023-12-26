import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  height: 72px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 16px 12px;
  elevation: 4;
  background: ${(props: any) => props.theme.TAB_BAR};
`;

export const IconButton = styled.TouchableOpacity``;

export const TextContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 700;
  font-family: 'Inter-Bold';
  color: ${(props: any) => props.theme.TEXT_COLOR};
`;

export const Subtitle = styled.Text`
  font-size: 12px;
  font-family: 'Inter-Regular';
  font-style: italic;
  color: ${(props: any) => props.theme.TEXT_COLOR};
`;
