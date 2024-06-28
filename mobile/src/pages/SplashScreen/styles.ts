import styled from 'styled-components/native';
import { darkTheme } from '../../tokens/colors';

// @ts-ignore
export const Container = styled.View`
  background-color: ${() => darkTheme.PRIMARY_COLOR};
  flex: 1;
  align-items: center;
  justify-content: center;
`;
