import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  width: 100%;
`;

export const Disclaimer = styled.p`
  width: 100%;
  text-align: right;
  padding-right: 12px;
  font-size: 12px;
  font-family: 'Inter-Regular';
  color: ${(props: any) => props.theme.GRAY500};
`;

export const ButtonsContainer = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ShareButton = styled.button`
  width: 56px;
  height: 56px;
  align-items: center;
  justify-content: center;
  border-radius: 28px;
  margin-right: 12px;
  padding: 0;
  background-color: ${(props: any) => props.theme.PRIMARY_COLOR};
`;
