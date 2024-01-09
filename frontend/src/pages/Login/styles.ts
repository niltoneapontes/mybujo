import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props: any) => props.theme.GRAY400};
  position: relative;
`;

export const LoginImage = styled.img`
  width: 100%;
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  padding: 16px;
`;

export const GoogleButton = styled.button`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 54px;
  width: 100%;
  background-color: ${(props: any) => props.theme.WHITE};
  border-radius: 8px;
  elevation: 4;
  margin-bottom: 12px;
`;

export const GoogleButtonText = styled.p`
  font-size: 14px;
  font-family: 'Inter-Bold';
  margin-left: 16px;
  color: ${(props: any) => props.theme.GOOGLE_COLOR};
`;

export const Disclaimer = styled.p`
  font-size: 12px;
  font-family: 'Inter-Regular';
  color: ${(props: any) => props.theme.TEXT_COLOR};
  text-align: center;
  margin: 16px;
`;

export const DisclaimerLink = styled.a`
  font-size: 12px;
  font-family: 'Inter-Regular';
  text-decoration: underline;
  color: ${(props: any) => props.theme.PRIMARY_COLOR};
  text-align: center;
  margin: 16px;
`;

export const FacebookButton = styled.button`
  padding: 12px;
  background-color: ${(props: any) => props.theme.FACEBOOK};
  border-radius: 8px;
  height: 54px;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const FacebookButtonText = styled.p`
  color: ${(props: any) => props.theme.WHITE};
  padding-left: 16px;
  font-size: 14px;
  font-family: 'Inter-Bold';
`;
