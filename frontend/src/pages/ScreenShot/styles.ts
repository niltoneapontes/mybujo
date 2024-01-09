import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  width: 100%;
  background-color: ${(props: any) => props.theme.BACKGROUND_COLOR};
  elevation: 4;
  overflow: hidden;
`;

export const DateContainer = styled.div`
  background-color: ${(props: any) => props.theme.PRIMARY_COLOR};
  align-items: center;
  padding: 16px;
  justify-content: center;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
`;

export const Title = styled.p`
  font-size: 28px;
  width: 100%;
  text-align: center;
  padding: 4px 8px;
  font-family: 'Inter-Black';
  color: ${(props: any) => props.theme.WHITE};
`;

export const DateText = styled.p`
  font-size: 16px;
  width: 100%;
  text-align: center;
  padding: 4px 8px;
  margin-top: 12px;
  font-family: 'Inter-Bold';
  color: ${(props: any) => props.theme.TEXT_COLOR};
`;

export const FooterContainer = styled.div`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  bottom: 8px;
  right: 0;
`;

export const FooterText = styled.p`
  font-size: 16px;
  text-align: center;
  font-family: 'Inter-Regular';
  color: ${(props: any) => props.theme.TEXT_COLOR};
`;

export const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  margin-left: 8px;
  margin-right: 16px;
  overflow: hidden;
`;
