import styled from 'styled-components/native';
import { lightTheme } from '../../tokens/colors';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${() => lightTheme.BACKGROUND_COLOR};
`;
