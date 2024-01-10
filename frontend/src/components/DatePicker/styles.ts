import styled from 'styled-components';
import { lightTheme } from '../../tokens/colors';

export const Positioner = styled.div`
  position: absolute;
  left: 50%;
  top: 2rem;
  transform: translateX(-50%);
`

export const ModalContainer = styled.div`
  justify-content: flex-start;
  padding-top: 0.5rem;
  border-radius: 1rem;
  align-items: center;
  background-color: 'rgba(0,0,0,0.5)';
`;

export const DatePickerItem = styled.button`
  background-color: ${(props: any) => lightTheme.PRIMARY_COLOR_DARKER};
  width: 10rem;
  padding: 0.5rem;
`;

export const DatePickerItemText = styled.p`
  color: ${(props: any) => lightTheme.WHITE};
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
`;
