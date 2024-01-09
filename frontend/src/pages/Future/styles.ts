import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${(props: any) => props.theme.BACKGROUND_COLOR};
`;
