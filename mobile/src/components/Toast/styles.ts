import styled from 'styled-components/native';

export const Container = styled.View`
  width: 80%;
  border: none;
  border-radius: 8px;
  background-color: ${props =>
    props.type === 'error'
      ? props.theme.ERROR_COLOR
      : props.theme.PRIMARY_COLOR_DARKER};
  position: absolute;
  bottom: 54px;
  left: 10%;
  opacity: 0.9;
`;

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 16px;
  position: relative;
`;

export const ToastText = styled.Text`
  font-size: 16px;
  font-family: 'Inter-Regular';
  color: ${(props: any) => props.theme.WHITE};
  text-align: left;
  margin-left: 12px;
  margin-right: 16px;
`;
