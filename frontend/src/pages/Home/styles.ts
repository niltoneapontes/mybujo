import styled from 'styled-components';
import { lightTheme } from '../../tokens/colors';

export const Container = styled.div`
  flex: 1;
  min-height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${(props: any) => lightTheme.BACKGROUND_COLOR};
`;
