import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const CollectionText = styled.Text`
  max-width: 80%;
  font-size: 32px;
  font-weight: bold;
  font-family: 'Inter-Bold';
  color: ${props => props.theme.PRIMARY_COLOR};
`;
