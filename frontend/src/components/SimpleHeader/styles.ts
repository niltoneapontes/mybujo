import styled from 'styled-components';
import { lightTheme } from '../../tokens/colors';

export const Container = styled.div`
  flex-direction: row;
  height: 72px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 16px 12px;
  elevation: 4;
  background: ${(props: any) => lightTheme.TAB_BAR};
`;

export const IconButton = styled.button`
  min-width: 24px;
`;

export const TextContainer = styled.div`
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
`;

export const Title = styled.p`
  font-size: 24px;
  font-family: 'Inter-Bold';
  color: ${(props: any) => lightTheme.TEXT_COLOR};
`;
