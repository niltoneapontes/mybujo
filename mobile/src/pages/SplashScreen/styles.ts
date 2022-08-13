import {MotiView} from 'moti';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.BACKGROUND_COLOR};
`;

export const OrangeCircle = styled(MotiView)`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: #ff9000;
`;

export const BlueCircle = styled(MotiView)`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: #008dd5;
`;

export const TextContainer = styled(MotiView)`
  position: absolute;
  top: 40%;
`;
