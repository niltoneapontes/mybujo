import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  padding: 16px;
  background-color: ${(props: any) => props.theme.BACKGROUND_COLOR};
`;

export const CollectionText = styled.Text`
  max-width: 80%;
  font-size: 24px;
  margin-bottom: 32px;
  font-family: 'Inter-Bold';
  text-align: center;
  color: ${(props: any) => props.theme.TEXT_COLOR};
`;

export const FooterComponent = styled.View`
  width: 100%;
  height: 240px;
  align-items: center;
  justify-content: center;
`;
