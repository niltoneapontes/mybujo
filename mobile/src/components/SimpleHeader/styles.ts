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

export const IconButton = styled.TouchableOpacity`
  min-width: 24px;
`;

export const TextContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: 'Inter-Bold';
  color: ${(props: any) => props.theme.TEXT_COLOR};
`;
