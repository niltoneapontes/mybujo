import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
`;

export const Disclaimer = styled.Text`
  width: 100%;
  text-align: right;
  padding-right: 12px;
  font-size: 14px;
  font-family: 'Inter-Regular';
  color: ${(props: any) => props.theme.GRAY500};
`;
