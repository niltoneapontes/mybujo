import styled from 'styled-components/native';

export const CopyPasteContainer = styled.View`
  background-color: ${(props: any) => props.theme.ACCENT_COLOR};
  border-radius: 8px;
  padding: 12px;
  width: 100px;
  margin-left: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CopyPasteContainerText = styled.Text`
  color: ${(props: any) => props.theme.ACCENT_COLOR_TEXT};
  max-width: 50px;
  font-size: 10px;
  text-align: center;
  font-family: 'Inter-SemiBold';
`;
