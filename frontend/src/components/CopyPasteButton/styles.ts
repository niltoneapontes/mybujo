import styled from 'styled-components';
import { lightTheme } from '../../tokens/colors';

export const CopyPasteContainer = styled.div`
  background-color: ${(props: any) => lightTheme.PRIMARY_COLOR};
  border-radius: 8px;
  padding: 12px;
  width: 100px;
  margin-left: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CopyPasteButtonElement = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const CopyPasteContainerText = styled.p`
  color: ${(props: any) => lightTheme.SOFT_WHITE};
  max-width: 50px;
  font-size: 10px;
  text-align: center;
  font-family: 'Inter-SemiBold';
`;
