import styled from 'styled-components/native';
import { lightTheme } from '../../tokens/colors';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  padding: 16px;
  background-color: ${(props: any) => props.theme.BACKGROUND_COLOR};
`;

export const CollectionText = styled.Text`
  max-width: 80%;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 32px;
  font-family: 'Inter-Bold';
  color: ${() => lightTheme.PRIMARY_COLOR};
`;
