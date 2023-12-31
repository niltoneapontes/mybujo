import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
`;

export const CopyPasteContainer = styled.View`
  background-color: ${(props: any) => props.theme.PRIMARY_COLOR};
  border-radius: 8px;
  padding: 12px;
  width: 100px;
  margin-left: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CopyPasteContainerText = styled.Text`
  color: ${(props: any) => props.theme.WHITE};
  max-width: 50px;
  font-size: 10px;
  text-align: center;
  font-family: 'Inter-SemiBold';
`;

export const Disclaimer = styled.Text`
  width: 100%;
  text-align: right;
  padding-right: 12px;
  font-size: 12px;
  font-family: 'Inter-Regular';
  color: ${(props: any) => props.theme.GRAY500};
`;
