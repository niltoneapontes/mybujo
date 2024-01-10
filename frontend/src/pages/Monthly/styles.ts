import styled from 'styled-components';
import { lightTheme } from '../../tokens/colors';

export const Container = styled.div`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${(props: any) => lightTheme.BACKGROUND_COLOR};
`;
