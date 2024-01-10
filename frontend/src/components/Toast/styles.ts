import styled from 'styled-components';
import { lightTheme } from '../../tokens/colors';

export const Container = styled.div`
  width: 90%;
  border: none;
  border-radius: 8px;
  background-color: ${props =>
    props.type === 'error'
      ? lightTheme.ERROR_COLOR
      : lightTheme.PRIMARY_COLOR_DARKER};
  position: absolute;
  bottom: 40px;
  left: 5%;
  opacity: 0.9;
`;

export const Wrapper = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 16px;
  position: relative;
`;

export const ToastText = styled.p`
  font-size: 16px;
  font-family: 'Inter-Regular';
  color: ${(props: any) => lightTheme.WHITE};
  text-align: left;
  margin-left: 12px;
  margin-right: 16px;
`;
