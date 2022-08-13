import styled from 'styled-components/native';

export const SideBarContainer = styled.View`
  flex: 1;
  width: 80%;
  background-color: ${props => props.theme.BACKGROUND_COLOR};
  align-items: center;
  justify-content: space-around;
  position: absolute;
  elevation: 8;
  left: 0;
  top: 0;
`;
