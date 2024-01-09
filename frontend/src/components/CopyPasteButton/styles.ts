import styled from 'styled-components';

export const CopyPasteContainer = styled.div`
  background-color: ${(props: any) => props.theme.PRIMARY_COLOR};
  border-radius: 8px;
  padding: 12px;
  width: 100px;
  margin-left: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CopyPasteContainerText = styled.p`
  color: ${(props: any) => props.theme.SOFT_WHITE};
  max-width: 50px;
  font-size: 10px;
  text-align: center;
  font-family: 'Inter-SemiBold';
`;
